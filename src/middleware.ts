import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register" || path === "/" ||  path === "/password/forgot" || path === "/password/reset" ;
  const isPath = path === "/dashboard" || path === "/password/change" || path === "/profile" || path === "/profile/edit";

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  

  if ((isPublicPath) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (isPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/profile",
    "/login",
    "/register",
    "/password/change",
    "/password/forgot",
    "/password/reset",
    "/profile",
    "/profile/edit",
  ],
};