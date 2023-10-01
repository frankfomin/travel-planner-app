import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const userId = req.cookies.get("userId");

    console.log("userId", userId?.value);

    if (!userId?.value) {
      console.log("no value");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const cachedTrip = await redis.get(userId.value);

    return NextResponse.json(cachedTrip);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
