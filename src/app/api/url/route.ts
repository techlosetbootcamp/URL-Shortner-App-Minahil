import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import generateShortUrl from "@/constants/generateShortUrl";
import useGenerateQRCode from "@/hooks/useGenerateQRCode";

export const POST = async (req: NextRequest, res: NextResponse) => {
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
    const qrCode = await useGenerateQRCode(shortUrl);
    console.log("qrCode");
    console.log(qrCode);

    const result = await prisma.$transaction(async (tx) => {
      const originalUrl = await tx.url.findFirst({
        where: {
          originalUrl: url,
        },
      });
      if (originalUrl) {
        return originalUrl;
      }

      const newUrl = await tx.url.create({
        data: {
          originalUrl: url!,
          shortUrl,
          qrCode:qrCode,
          urlCode: shortCode,
          active: true
        },
      });
      console.log("newUrl");
      console.log(newUrl);
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
      { message: "shorUrl generated", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
