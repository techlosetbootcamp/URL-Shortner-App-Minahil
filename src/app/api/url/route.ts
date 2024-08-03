import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import GENERATE_SHORT_URL from "@/constants/generateShortUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { URL_TYPE } from "@/types/types";
import { GENERATE_QR_CODE } from "@/constants/generateQrCode";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  try {
    const body = await req.json();
    const { url } = body;
    if (!url) {
      return NextResponse.json(
        { message: "Please provide url" },
        { status: 400 }
      );
    }
    const host = req.headers.get("host");
    const { shortCode, shortUrl } = GENERATE_SHORT_URL(host!);
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
          urlCode: shortCode!,
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

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  try {
    let urls: URL_TYPE[] = [];
    if (session?.user) {
      urls = await prisma.url.findMany({
        where: { user_email: session.user.email },
      });
    } else {
      const allUrls = await prisma.url.findMany({});
      urls = allUrls.filter((url) => !url.user_email);
    }
    return NextResponse.json(
      { message: "urls fetched", result: urls },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
