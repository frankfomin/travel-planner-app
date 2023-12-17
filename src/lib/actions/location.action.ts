"use server";

import { Details, locationDetailsParams } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getLocationDetails({
  location,
  lat,
  lng,
}: locationDetailsParams) {
  try {
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

    return {
      details,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "internal error",
    };
  }
}

export async function getLocationDescription(locationName: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `please provide short description of ${locationName}`,
        },
        {
          role: "user",
          content: `${locationName}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    console.log("COMPLETION", completion);

    const responseText = completion.choices[0].message.content;

    return {
      description: responseText,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: "internal error",
    };
  }
}
