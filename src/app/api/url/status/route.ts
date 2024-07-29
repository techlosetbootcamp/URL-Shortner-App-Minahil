import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { urlCode } = body;

    try {
      const currentUrl = await prisma.url.findUnique({
        where: { urlCode },
      });

      if (!currentUrl) {
        return new NextResponse("URL not found", { status: 404 });
      }

      const updatedUrl = await prisma.url.update({
        where: { urlCode },
        data: {
          active: !currentUrl.active,
        },
      });

      return NextResponse.json(
        { message: "URL's status updated", updatedUrl },
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse("Failed to update URL status", { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
