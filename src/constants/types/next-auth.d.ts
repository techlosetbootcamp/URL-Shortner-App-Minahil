import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?:string;
    email?: string;
  }
  interface Session {
    user: User & {name:string}
    token:{
      name:string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {   
    id?: string;
    email?: string;
  }
}