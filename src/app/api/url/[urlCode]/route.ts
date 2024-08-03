import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import GENERATE_SHORT_URL from "@/constants/generateShortUrl";

export const PATCH = async (req: NextRequest) => {
  try {
    const urlCode: string = req.url.split("/url/")[1];
    const host = req.headers?.get("host");
    const body = await req.json();
    const { newUrlCode } = body;
    const { shortUrl } = GENERATE_SHORT_URL(host!, newUrlCode);
    if (newUrlCode) {
      const url = await prisma.url.findUnique({
        where: { urlCode: newUrlCode },
      });
      if (url) {
        return NextResponse.json(
          { message: "This short url already exists" },
          { status: 400 }
        );
      }
      const updatedUrl = await prisma.url.update({
        where: { urlCode },
        data: {
          urlCode: newUrlCode,
          shortUrl: shortUrl,
        },
      });
      return NextResponse.json(
        { message: "urls updated", url, updatedUrl },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "empty field" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const urlCode: string = req.url.split("/url/")[1];

    const url = await prisma.url.findUnique({
      where: { urlCode },
      include: { UrlAnalytic: true },
    });

    if (!url) {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    await prisma.urlAnalytic.delete({
      where: { url_id: url.id },
    });

    await prisma.url.delete({
      where: { urlCode },
    });

    return NextResponse.json(
      { message: "URL and its analytics deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
