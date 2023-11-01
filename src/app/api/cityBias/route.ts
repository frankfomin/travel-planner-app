import { redis } from "@/lib/redis";
import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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

export async function GET() {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    const placeId = tripDetails?.place_id;

    if (!placeId) {
      return new NextResponse("No placeID provided", { status: 400 });
    }

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
