import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";

export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, newEmail } = body;

    if (!name || !newEmail) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 401 }
      );
    }

    if (newEmail !== email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: newEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "This email is already registered" },
          { status: 400 }
        );
      }
    }

    try {
      await prisma.user.update({
        where: { email },
        data: {
          name,
          email: newEmail,
        },
      });

      return new NextResponse("User's profile updated", { status: 200 });
    } catch (error: any) {
      return new NextResponse(error.message || "Internal Server Error", {
        status: 500,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
