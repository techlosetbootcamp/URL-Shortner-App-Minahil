import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import crypto from "crypto";
import sendResetPasswordEmail from "@/constants/sendEmail/sendEmail";
export const POST = async (req: NextRequest) => {
  try {
    console.log("Hi there")
    const body = await req.json();
    const { email } = body;
    console.log(email);

    if (!email) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
console.log(existingUser?.name);
    if (!existingUser) {
      return new NextResponse("Email doesn't exist",
          { status: 409 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const passwordResetExpires = new Date(Date.now() + 3600000);

    
    existingUser.resetToken=passwordResetToken;
    existingUser.resetTokenExpiry=passwordResetExpires;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpires,
      },
    });
    console.log(updatedUser);
    await sendResetPasswordEmail(email,resetToken);
    
    // const resetUrl = `localhost:3000/password/reset/${resetToken}`;
    // console.log(resetUrl);
    return NextResponse.json(
      { message: "Password Reset Email Sent" },
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