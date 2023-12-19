"use server";

import { Details, Photo, locationDetailsParams } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import OpenAI from "openai";
import { redis } from "../redis";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type tripDetails = {
  city: string;
  place_id: string;
};

export async function tripDetails() {
  try {
    console.log("TRIP DETAILS");
    const cookie = cookies();
    const userId = cookie.get("userId");

    const tripDetails: tripDetails | null = await redis.hgetall(
      `tripDetails:${userId?.value}`
    );

    const cachedLocation = await redis.hgetall(`location:${userId?.value}`);

    if (cachedLocation?.photo) {
      return {
        city: tripDetails?.city,
        photo: cachedLocation.photo as Photo,
      };
    }

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=photos&place_id=${tripDetails?.place_id}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const photos = data.result.photos as Photo[];

    const firstPhotoReference = photos[0];

    await redis.hmset(`location:${userId?.value}`, {
      photo: firstPhotoReference,
    });

    console.log("PHOTO", firstPhotoReference);
    console.log("city", tripDetails?.city);

    return {
      city: tripDetails?.city,
      photo: firstPhotoReference,
    };
  } catch (error) {}
}

export async function getLocationDetails({
  location,
  lat,
  lng,
  locationCount,
}: locationDetailsParams) {
  try {
    console.log("LOCATION DETAILS", locationCount);

    const cookie = cookies();
    const userId = cookie.get("userId");

    const cachedLocation = await redis.hgetall(
      `location${locationCount}:${userId?.value}`
    );

    console.log(`cached location ${locationCount}`, cachedLocation);

    if (cachedLocation?.details) {
      return {
        details: cachedLocation.details as Details,
      };
    }

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

    await redis.hmset(`location${locationCount}:${userId?.value}`, {
      details: JSON.stringify(details),
    });

 

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

export async function getLocationDescription({
  locationName,
  locationCount,
}: {
  locationName: string;
  locationCount: number;
}) {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");

    const cachedLocation = await redis.hgetall(
      `location${locationCount}:${userId?.value}`
    );

    if (cachedLocation?.locDescription) {
      return {
        description: cachedLocation.locDescription + " cached",
      };
    }

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

    await redis.hmset(`location${locationCount}:${userId?.value}`, {
      locDescription: responseText,
    });

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
