import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";

export const GET = async (
  req: NextRequest,
  { params }: { params: { code: string } }
) => {
  const { code } = params;

  try {
    const urlEntry = await prisma.url.findFirst({
      where: {
        urlCode: code,
      },
    });

    if (!urlEntry) {
      console.log("No URL entry found for code:", code);
      return NextResponse.json(
        { message: "Invalid short URL" },
        { status: 404 }
      );
    }

    const analytic = await prisma.urlAnalytic.findFirst({
      where: {
        url_id: urlEntry.id,
      },
    });

    if (!analytic) {
      console.log("No analytics found for URL ID:", urlEntry.id);
      return NextResponse.json(
        { message: "No analytics data found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      analytic,
      status: 200,
      message: "Analytics Fetched",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
