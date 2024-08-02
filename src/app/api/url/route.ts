import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import generateShortUrl from "@/constants/generateShortUrl";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { urlType } from "@/constants/types/types";
import { GenerateQRCode } from "@/constants/generateQrCode";
import { load } from "cheerio";

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
    const { shortCode, shortUrl } = generateShortUrl(host!);
    const qrCode = await GenerateQRCode(shortUrl);
 
    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    const strippedDomain = domain.startsWith("www.") ? domain.slice(4) : domain;

    const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${strippedDomain}`;
    console.log("favicon:", favicon);

    const image:string = favicon ||  "";

    console.log("Final image selected:", image);

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
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  try {
    let urls: urlType[] = [];
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
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
