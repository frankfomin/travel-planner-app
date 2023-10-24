import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") 

    console.log("IP", ip);

    return NextResponse.json(ip);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
