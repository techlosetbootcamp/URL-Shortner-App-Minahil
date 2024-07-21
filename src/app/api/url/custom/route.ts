import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import generateShortUrl from "@/constants/generateShortUrl";
import useGenerateQRCode from "@/hooks/useGenerateQRCode";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(authOptions);
    try {
      const body = await req.json();
      const { url,customSlug } = body;
      if (!url) {
        return NextResponse.json(
          { message: "Please provide url" },
          { status: 400 }
        );
      }
  
      const host = req.headers.get("host");
  
      const { shortUrl } = generateShortUrl(host!,customSlug);
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
  