import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/config/prismadb";


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all the fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const {password:newUserPassword, ...rest}=user;
    return NextResponse.json(
      { message: "Registration successful", user:rest },
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
//   try {
//     const { name, email, password } = await req.json();
//     if (!name || !email || !password)
//       return NextResponse.json({ message: "invalid Data" }, { status: 422 });
//     const hashedPassword=await bcrypt.hash(password,12);
//     await connectToDatabase();

//     const user = await prisma.user.create({
//       data: {
//         name: name,
//         email: email,
//         hashedPassword: hashedPassword,
//       },
//     });
//     return NextResponse.json({user},{status:201});
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({message: "Server Error"},{status:500});

//   } finally {
//     await prisma.$disconnect();
//   }
// };

// export async function POST(
//     req: Request,
// ){
//     console.log("Hello to post");
//     try{
//         const body:userType = await req.json();

//         const {name, email, password}=body;
//         console.log(name,email,password);

//         if(!email || !password){
//             return new NextResponse("Missing Data", {status: 500});
//         }

//         const userAlreadyExist=await prisma.user.findFirst({
//             where:{
//                 email:email,
//             }
//         })

//         if(userAlreadyExist?.id){
//             return new NextResponse("User Already Exists", {status: 500});
//         }

//         const hashedPassword=await bcrypt.hash(password,12);
// console.log("creating new user")
//         const newUser=await prisma.user.create({
//             data:{
//                 name: name,
//                 email:email,
//                 hashedPassword:hashedPassword,
//             }
//         });

//         return new NextResponse(JSON.stringify(newUser), {status:201});

//     }catch(err){
//         console.log("Registeration error: ",err);
//         return new NextResponse("Internal server error", {status: 500})
//     }
// }
