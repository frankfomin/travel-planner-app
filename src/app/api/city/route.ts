import { db } from "@/db/db";
import axios from "axios";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { NextResponse } from "next/server";

type AutocompleteResult = {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
};

type UniqueMainTexts = { [key: string]: boolean };
export async function POST(req: Request) {
  const cityName = await req.json();

  console.log("CITY NAME", cityName);

  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityName}&types=%28cities%29&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    console.log("RES", res);

    const city: AutocompleteResult[] = res.data.predictions;
    console.log("DATA", res.data.predictions);
    // Create an object to keep track of unique main_text values
    const uniqueMainTexts: UniqueMainTexts = {};

    // Filter out duplicate entries based on main_text
    const uniquePredictions = city.filter((prediction) => {
      if (!uniqueMainTexts[prediction.structured_formatting.main_text]) {
        uniqueMainTexts[prediction.structured_formatting.main_text] = true;
        return true;
      }
      return false;
    });

    return NextResponse.json(uniquePredictions);
  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
