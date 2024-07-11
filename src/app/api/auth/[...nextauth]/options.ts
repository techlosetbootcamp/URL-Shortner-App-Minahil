import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/config/prismadb";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions ={
    adapter:PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages:{
        signIn:'/login',
    },
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

                const existingUser = await prisma.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                });
                if(!existingUser)
                    return null;

                if(!existingUser?.id || !existingUser?.password){
                    throw new Error("Invalid credentials");
                }

                const currentHashedPassword = await bcrypt.hash(credentials?.password,12);
                
                const passMAtch= await bcrypt.compare(credentials.password,existingUser.password);
                if(!passMAtch)
                    throw new Error("Incorrect password");
                return {
                    id:existingUser.id,
                    name:existingUser.name,
                    email:existingUser.email
                };
            },
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                return{
                    ...token,
                    name:user.name
                }
            }
            return token
        },
        async session({session,token}){
            return{
                ...session,
                user:{
                    ...session.user,
                    name:token.name
                }
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    
    debug: process.env.NODE_ENV !== "production",
}