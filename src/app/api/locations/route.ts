import { redis } from "@/lib/redis";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

type OpeningHours = {
  open_now?: boolean;
};

type Place = {
  name: string;
  opening_hours?: OpeningHours;
  place_id: string;
  rating?: number;
};

type Details = {
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  reviews: {
    author_name: string;
    author_url: string;
    language: string;
    original_language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    translated: boolean;
  }[];
};

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get("userId");
    if (!userId?.value) {
      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    const cachedTripData = await redis.lrange(userId.value, 0, -1);

    if (cachedTripData && cachedTripData.length > 0) {
      return NextResponse.json(JSON.stringify("Trip already in cache"), {
        status: 200,
      });
    }
    const { location, lat, lng } = await req.json();

    const placeId = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&locationbias=circle%3A10000%40${lat}%2C${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    const candidates = placeId.data.candidates;

    console.log(candidates);

    const firstPlaceId = candidates[0].place_id;

    console.log(firstPlaceId);

    const placeDetails = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=reviews%2Cphotos%2Cname%2Crating%2Copening_hours%2Cprice_level&place_id=${firstPlaceId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const details = placeDetails.data.result as Details;

    return NextResponse.json(details, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
