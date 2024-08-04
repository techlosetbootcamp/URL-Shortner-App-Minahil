import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/" ||
    path === "/password/forgot" ||
    path === "/password/reset";

  const isProtectedPath =
    path === "/dashboard" ||
    path === "/password/change" ||
    path === "/profile" ||
    path === "/profile/edit" ||
    path === "/url/add";
  const cookie = request.cookies.get(process.env.AUTH_COOKIE!); 

  if (isPublicPath && cookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedPath && !cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/login",
    "/register",
    "/password/change",
    "/password/forgot",
    "/password/reset",
    "/profile",
    "/profile/edit",
    "/url/add",
  ],
};
