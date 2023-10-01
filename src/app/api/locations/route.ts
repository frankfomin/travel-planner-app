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
  const { locations, lat, lng, city } = await req.json();

  console.log("locations", locations);

  const locationsArray = locations.split(",");

  try {
    const responses: Place[] = await Promise.all(
      locationsArray.map(async (locationName: string) => {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${locationName}&inputtype=textquery&locationbias=circle%3A30000%${lat}%2C${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );
        const candidates = res.data.candidates;
        console.log(
          "API CALLED",
          ` https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${locationName}&inputtype=textquery&locationbias=circle%3A30000%${lat}%2C${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );

        console.log("candidates", candidates);
        // Extract the first place_id from the candidates, or return an empty object if candidates is empty
        const firstPlaceId =
          candidates.length > 0 ? candidates[0].place_id : "";
        return { place_id: firstPlaceId };
      })
    );

    console.log("responses", responses);
    const placeIds = responses
      .flat()
      .map((candidate: any) => candidate.place_id);

    const detailsRes = await Promise.all(
      placeIds.map(async (place_id: string) => {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?fields=reviews%2Cphotos%2Cname%2Crating%2Copening_hours%2Cprice_level&place_id=${place_id}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );
        return res.data.result as Details; // Use 'result' instead of 'candidates' for place details
      })
    );
    //Filter out
    const descRes = await Promise.all(
      locationsArray.map(async (locationName: string) => {
        console.log("locationName", locationName);
        const res = await axios.post(
          "http://localhost:3000/api/openAi/locationDesc",
          JSON.stringify(locationName)
        );

        return res.data;
      })
    );
    console.log("descRef", descRes);

    const combinedRes = detailsRes.map((detail: Details, index: number) => {
      return {
        ...detail,
        description: descRes[index],
      };
    });

    const userId = req.cookies.get("userId");
    if (!userId?.value) {
      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    await redis.set(userId.value, combinedRes);

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
