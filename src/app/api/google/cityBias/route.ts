import { redis } from "@/lib/redis";
import { Geometry } from "@/types";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");
    const header = headers();
    const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

    const currentRequestCount = await redis.incr(ip);
    await redis.expire(ip, 5);
    if (currentRequestCount > 20) {
      return new NextResponse("Too many requests", { status: 429 });
    }

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    const placeId = tripDetails?.place_id;

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const response = await res.json();
    const place: Geometry = response.result.geometry;

    const lat = place.location.lat;

    const lng = place.location.lng;

    return NextResponse.json({ lat, lng }, { status: 200 });
  } catch (error) {
    console.log("[city BIAS] error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
