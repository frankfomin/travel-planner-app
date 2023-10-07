import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const cachedTrip = await redis.get("3guuqwaLKUGsQ1TFpekkj");

    if (!cachedTrip) {
      console.log("no cached trip");
      return new NextResponse("No cached trip", { status: 401 });
    }
    return NextResponse.json(cachedTrip);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
