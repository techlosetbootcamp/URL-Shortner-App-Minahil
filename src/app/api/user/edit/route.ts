import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";
export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, newEmail } = body;
    console.log("email:")
    console.log(email)
    console.log("newemail:")
    console.log(newEmail)
    
    if (!name || !newEmail) {
      return NextResponse.json({ message: "Please fill all fields" }, { status: 401 });
    }
    if(newEmail!==email){
      console.log("not equal");
      const existingUser = await prisma.user.findFirst({
        where: { email: newEmail }
      });
      console.log("existingUser");
      console.log(existingUser);
  
      if (existingUser) {
        console.log(existingUser.name);
        return NextResponse.json(
          { message: "This email is already registered" },
          { status: 400 }
        );
      }
    }
    
   
  try{
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name: name,
        email:newEmail
      },
    });
    console.log(updatedUser);
    return new NextResponse("User's profile updated", {status:200});
  }catch(error:any){
    console.log("Hiiiii");
    return new NextResponse(error,{status:500});
  }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
