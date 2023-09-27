import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { redis } from "./lib/redis";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");

  const res = NextResponse.next();

  if (!userId) {
    res.cookies.set("userId", nanoid());
    console.log("setting cookie");
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
