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

    let htmlContent;
    try {
      htmlContent = await fetch(url).then((res) => res.text());
    } catch (fetchError) {
      console.error("Error fetching URL:", fetchError);
      return NextResponse.json(
        { message: "Error fetching URL content" },
        { status: 500 }
      );
    }

    const $ = load(htmlContent);
    console.log($);
    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('link[rel="apple-touch-icon"]').attr("href") ||
      $('link[rel="apple-touch-icon-precomposed"]').attr("href");

    const ogImage = $('meta[property="og:image"]').attr("content");
    const twitterImage = $('meta[name="twitter:image"]').attr("content");
    const appTileImage = $('meta[name="msapplication-TileImage"]').attr(
      "content"
    );

    console.log("ogImage:", ogImage);
    console.log("twitterImage:", twitterImage);
    console.log("appTileImage:", appTileImage);
    console.log("favicon:", favicon);
    let faviconUrl = "";
    if (favicon) {
      try {
        const baseUrl = new URL(url);
        faviconUrl = new URL(favicon, baseUrl.origin).href;
      } catch (urlError) {
        console.error("Error resolving favicon URL:", urlError);
      }
    }

    console.log("Resolved faviconUrl:", faviconUrl);

    const image = faviconUrl || ogImage || twitterImage || appTileImage || "";

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
