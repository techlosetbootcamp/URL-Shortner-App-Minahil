import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
    try {
      const email=session?.user.email;
      console.log(email);
      if (!email) {
        return NextResponse.json(
          { message: email },
          { status: 400 }
        );
      }
      
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
  
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 400 });
      }
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };