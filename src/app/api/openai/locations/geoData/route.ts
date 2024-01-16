import { Geometry } from "@/types";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { locations, lat, lng } = await req.json();

    const placeIds = await Promise.all(
      locations.map(async (location: string) => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&locationbias=circle%3A10000%40${lat}%2C${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );
        const placeId = await res.json();
        const candidates = placeId.candidates;
        console.log(candidates);
        const firstPlaceId = candidates[0].place_id;
        return firstPlaceId;
      })
    );

    const geoData = await Promise.all(
      placeIds.map(async (placeId) => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );
        const response = await res.json();
        const place: Geometry = response.result.geometry;
        const lat = place.location.lat;
        const lng = place.location.lng;
        return { lat, lng };
      })
    );

    return NextResponse.json({ geoData }, { status: 200 });
  } catch (error) {
    console.log("[geoData/route.ts] error");
    console.log(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
