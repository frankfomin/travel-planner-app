import axios from "axios";
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

export async function GET(
  req: Request,
  { params }: { params: { locationName: string } }
) {
  const locationName = params.locationName;
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${locationName}&types=%28cities%29&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const city: AutocompleteResult[] = res.data.predictions
    return NextResponse.json(city);

  } catch (error) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
