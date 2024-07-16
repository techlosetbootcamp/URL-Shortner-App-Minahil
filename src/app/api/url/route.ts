import { NextRequest, NextResponse } from "next/server";
import { isWebUri } from "valid-url";
import prisma from "@/config/prismadb";
import generateShortUrl from "@/constants/generateShortUrl";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const { url } = body;
    console.log(url);
    if (!url) {
      return NextResponse.json(
        { message: "Please provide url" },
        { status: 400 }
      );
    }

    const host = req.headers.get("host");
    console.log(host);
    const { shortCode, shortUrl } = generateShortUrl(host!);
    console.log(shortCode);
    console.log(shortUrl);

    if (!isWebUri(url!)) {
      return NextResponse.json({ message: "Invalid Url" }, { status: 400 });
    }
    console.log("Going to trans");
    const result = await prisma.$transaction(async (tx) => {
      const originalUrl = await tx.url.findFirst({
        where: {
          originalUrl: url,
        },
      });
      console.log("out from trans");
      if (originalUrl) {
        console.log(originalUrl);
        console.log("sameee");
        return originalUrl;
      }

      console.log("Going to trans of create");
      const newUrl = await tx.url.create({
        data: {
          originalUrl: url!,
          shortUrl,
          urlCode: shortCode,
        },
      });
      console.log(newUrl);
      console.log("Going to trans of anly");
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
      console.log("Going out from anly trans");
      return newUrl;
    });
    return NextResponse.json(
      { message: "shorUrl generated", result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
