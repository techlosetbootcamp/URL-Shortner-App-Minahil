import { NextRequest, NextResponse } from "next/server";
import generateShortUrl from "@/constants/generateShortUrl";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const host = req.headers.get("host");

    const { shortCode } = generateShortUrl(host!);

    return NextResponse.json(
      { message: "slug generated", slug: shortCode },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
