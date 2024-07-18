import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prismadb";

export const GET = async (req: NextRequest, { params }: { params: { code: string } }) => {
  const { code } = params;
  console.log("Received code:", code);

  try { 
    const result = await prisma.$transaction(async(tx)=>{
      const url = await tx.url.findUnique({
        where:{
          urlCode:code
        }
      });

     
      if(!url) return null;

      await tx.urlAnalytic.update({
        where:{
          url_id:url.id
        },
        data:{
          clicked:{
            increment:1
          }
        }
      });
      return url;
    });
    if(!result?.active){
      return new NextResponse("URL Deactivated", { status: 404 });
    }

    if(!result){
      return NextResponse.json({ message: "Invalid short URL" }, { status: 404 });
    }

    return NextResponse.redirect(result.originalUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};