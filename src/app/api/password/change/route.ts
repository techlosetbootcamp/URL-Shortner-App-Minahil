import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
import bcrypt from "bcryptjs";
export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { password,email } = body;
    
    if (!password) {
      return NextResponse.json({ message: "Please enter password" }, { status: 400 });
    }
   
    const hashedPassword=await bcrypt.hash(password,5);
  try{
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword
      },
    });
    console.log(updatedUser);
    return new NextResponse("User's password is updated", {status:200});
  }catch(error:any){
    return new NextResponse(error,{status:500});
  }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
