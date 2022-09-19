import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();

  if (pathname.startsWith("/_next")) return NextResponse.next();
  // Allow the requests if the following is true..
  // 1. Its a request for getting a next-auth session
  // 2. Token exists

  if (pathname.includes("/api/auth") || token) return NextResponse.next();

  // Redirect user to login page if user does'nt have a token AND requesting a protected route

  if (!token && pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
