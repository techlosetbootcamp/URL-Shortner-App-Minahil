import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import generateShortUrl from "@/constants/generateShortUrl";
import useGenerateQRCode from "@/hooks/useGenerateQRCode";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { urlType } from "@/constants/types/types";

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
    const qrCode = await useGenerateQRCode(shortUrl);
    console.log("qrCode");
    console.log(qrCode);

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
  console.log(session?.user.id);
  try {
    let urls: urlType[] = [];
    if (session?.user) {
      urls = await prisma.url.findMany({
        where: { user_email: session.user.email },
      });
      console.log("urls fetched login", urls.length);
    } else {
      const allUrls = await prisma.url.findMany({});
      urls = allUrls.filter((url) => !url.user_email);
      console.log("urls fetched logout", urls.length);
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

