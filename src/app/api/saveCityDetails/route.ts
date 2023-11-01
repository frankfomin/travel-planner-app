import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { city, place_id, date, activites } = await req.json();

    if (!city || !place_id) {
      return new Response("City or place_id not found", { status: 400 });
    }

    const userId = req.cookies.get("userId");
    console.log("USER ID", userId?.value);
    if (!userId?.value) {
      return new Response("User Id not found in cookies", { status: 400 });
    }
    await redis.hmset(`tripDetails:${userId.value}`, {
      city,
      place_id,
      date,
      activites,
    });

    const tripDetails = await redis.hgetall(`tripDetails:${userId.value}`);
    return NextResponse.json(tripDetails, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Something went wrong"), {
      status: 500,
    });
  }
}
