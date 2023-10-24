import { redis } from "@/lib/redis";
import axios from "axios";
import { NextResponse } from "next/server";

type Geometry = {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};

type cachedUserData = {
  city: string;
  activities: string;
  placeId: string;
};

export async function GET(res: NextResponse) {
  try {
    const userId = res.cookies.get("userId");

    if (!userId?.value) {
      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    const cachedTripData = await redis.lrange(userId.value, 0, -1);

    if (cachedTripData && cachedTripData.length > 0) {
      return NextResponse.json(JSON.stringify("Trip already in cache"), {
        status: 200,
      });
    }

    const cachedUserData: cachedUserData | null = await redis.hgetall(
      `user:${userId.value}`
    );

    if (!cachedUserData) {
      return new NextResponse("User data not found", { status: 404 });
    }

    const placeId = cachedUserData.placeId;

    if (!placeId)
      return new NextResponse("No placeID provided", { status: 400 });
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const place: Geometry = response.data.result.geometry;

    const lat = place.location.lat;

    const lng = place.location.lng;

    return NextResponse.json({ lat, lng });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
