import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  try {
    const userId = res.cookies.get("userId");
    if (!userId?.value) {
      console.log("sadasjda getCachedTrip route");
      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    const cachedTripData = await redis.lrange(userId.value, 0, -1);

    if (cachedTripData && cachedTripData.length > 0) {
      return NextResponse.json(cachedTripData, { status: 200 });
    }

    return new NextResponse(JSON.stringify("Error in "), { status: 200 });
  } catch (error) {
    console.error(error);
    console.log("Error in getCachedTrip route");
    return new NextResponse("Internal error", { status: 500 });
  }
}
