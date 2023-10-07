import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { redis } from "./lib/redis";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");

  console.log("userId", userId);

  const res = NextResponse.next();

  if (!userId) {
    const newUserId = nanoid();
    res.cookies.set("userId", newUserId);
    console.log("setting cookie", newUserId);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',],
};
