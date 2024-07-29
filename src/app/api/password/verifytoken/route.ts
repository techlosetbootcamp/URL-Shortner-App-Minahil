import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import crypto from "crypto";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }
    const hasehedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const existingUser = await prisma.user.findFirst({
      where: {
        resetToken: hasehedToken,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!existingUser) {
      return new NextResponse("Invalid Token or has expired", { status: 409 });
    }

    return new NextResponse(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
