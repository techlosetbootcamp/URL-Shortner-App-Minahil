import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import crypto from "crypto";
import SEND_RESET_PASSWORD_EMAIL from "@/constants/sendEmail";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return new NextResponse("Email doesn't exist", { status: 409 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = new Date(Date.now() + 3600000);

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpires,
      },
    });
    await SEND_RESET_PASSWORD_EMAIL(email, resetToken);

    return NextResponse.json(
      { message: "Password Reset Email Sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
