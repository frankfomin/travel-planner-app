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

export async function POST(req: Request) {
  const placeId = await req.json();
  try {
    if (!placeId)
      return new NextResponse("No placeID provided", { status: 400 });
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const place: Geometry = res.data.result.geometry;

    const lat = place.location.lat;

    const lng = place.location.lng;

    return NextResponse.json({ lat, lng });
  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
