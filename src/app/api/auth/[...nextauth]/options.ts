import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/config/prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions ={
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials || !credentials?.email || !credentials?.password){
                    throw new Error("Missing Credentials");
                }

                const user = await prisma.user.findFirst({
                    where:{
                        email: credentials?.email
                    }
                });

                if(!user || !user?.id || !user?.hashedPassword){
                    throw new Error("Invalid credentials");
                }

                const currentHashedPassword = await bcrypt.hash(credentials?.password,12);
                
                bcrypt.compare(currentHashedPassword,user.hashedPassword);
                return user;
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV !== "production",
}