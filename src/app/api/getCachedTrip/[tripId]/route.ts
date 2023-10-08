import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { tripId: string } }
) {
  try {
    const cachedTrip = await redis.get(params.tripId);
    return NextResponse.json(cachedTrip);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
