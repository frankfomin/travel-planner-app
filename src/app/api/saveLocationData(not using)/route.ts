import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { locationDetails, locationDescription } = await req.json();

    console.log("SAVE LOCATION DATA: ", locationDetails, locationDescription);

    if (!locationDetails || !locationDescription) {
      return new Response("No location details or description provided", {
        status: 400,
      });
    }

    const userId = req.cookies.get("userId");

    if (!userId?.value) {
      return new Response("User ID not found in cookies", { status: 400 });
    }

    const dataToStore = {
      locationDetails,
      locationDescription,
    };

    console.log("DATA TO STORE: ", dataToStore);

    await redis.lpush(userId.value, JSON.stringify(dataToStore));
    await redis.expire(userId.value, 3600);

    return new NextResponse(
      JSON.stringify("Location data saved successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR IN SAVING LOCATION DATA: ", error);
  }
}
