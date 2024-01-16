import { redis } from "@/lib/redis";
import { Details } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { location, lat, lng, locationCount } = await req.json();

    console.log(location, lat, lng, locationCount);
    const cookie = cookies();
    const userId = cookie.get("userId");

    const cachedLocation = await redis.hgetall(
      `location${locationCount}:${userId?.value}`
    );

    if (cachedLocation?.details) {
      return NextResponse.json(
        { details: cachedLocation.details as Details },
        { status: 200 }
      );
    }

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&locationbias=circle%3A10000%40${lat}%2C${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const placeId = await res.json();
    const candidates = placeId.candidates;

    console.log(candidates);

    const firstPlaceId = candidates[0].place_id;

    console.log(firstPlaceId);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=reviews%2Cphotos%2Cname%2Crating%2Copening_hours%2Cprice_level&place_id=${firstPlaceId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const placeDetails = await response.json();

    const details = placeDetails.result as Details;

    await redis.hmset(`location${locationCount}:${userId?.value}`, {
      details: JSON.stringify(details),
    });

    await redis.expire(`location${locationCount}:${userId?.value}`, 3600);

    return NextResponse.json({ details }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
