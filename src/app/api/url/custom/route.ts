import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import GENERATE_SHORT_URL from "@/constants/generateShortUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/options";
import { GENERATE_QR_CODE } from "@/constants/generateQrCode";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  try {
    const body = await req.json();
    const { url, customSlug } = body;
    if (!url) {
      return NextResponse.json(
        { message: "Please provide url" },
        { status: 400 }
      );
    }

    const host = req.headers.get("host");

    const { shortUrl } = GENERATE_SHORT_URL(host!, customSlug);
    const qrCode = await GENERATE_QR_CODE(shortUrl);

    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    const strippedDomain = domain.startsWith("www.") ? domain.slice(4) : domain;

    const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${strippedDomain}`;

    const image: string = favicon || "";

    const result = await prisma.$transaction(async (tx) => {
      const originalUrl = await tx.url.findFirst({
        where: {
          AND: [
            { originalUrl: url },
            { user_email: session?.user ? session.user.email : null },
          ],
        },
      });
      if (originalUrl) {
        return originalUrl;
      }

      const newUrl = await tx.url.create({
        data: {
          originalUrl: url,
          iconImg: image,
          shortUrl,
          qrCode: qrCode,
          urlCode: customSlug,
          user: session?.user
            ? {
                connect: {
                  email: session.user.email,
                },
              }
            : undefined,
        },
      });

      await tx.urlAnalytic.create({
        data: {
          clicked: 0,
          url: {
            connect: {
              id: newUrl.id,
            },
          },
        },
      });
      return newUrl;
    });

    return NextResponse.json(
      { message: "shortUrl generated", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
