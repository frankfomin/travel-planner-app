import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const { activities, city, placeId } = await req.json();

    if (!activities || !city) {
      return new Response("Missing activities or city", { status: 400 });
    }

   /*  console.log("HELLO API");

    if (!req.cookies.get("userId")) {
      console.log("setting cookie");
      req.cookies.set("userId", nanoid());
      console.log("COOKIE VALUE",req.cookies.get("userId")?.value);
    } */

    const userId = req.cookies.get("userId");
    console.log("USER ID", userId?.value)
    if (!userId?.value) {
      return new Response("User Id not found in cookies", { status: 400 });
    }

    await Promise.all([
      await redis.hmset(`user:${userId.value}`, {
        city,
        placeId,
        activities: JSON.stringify(activities),
      }),
      await redis.del(userId.value),
      await redis.del(`cityDetails:${userId.value}`),
    ]);

    return new NextResponse(JSON.stringify("Success"), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal error", { status: 500 });
  }
}
