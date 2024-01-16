"use server";

import { Details, Geometry, Photo, locationDetailsParams } from "@/types";
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

    const cachedLocation = await redis.hgetall(`location:${userId?.value}`);

    if (cachedLocation) {
      return {
        city: cachedLocation.city as string,
        photo: cachedLocation.photo as Photo,
      };
    }

    const tripDetails: tripDetails | null = await redis.hgetall(
      `tripDetails:${userId?.value}`
    );

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=photos&place_id=${tripDetails?.place_id}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const photos = data.result.photos as Photo[];

    const firstPhotoReference = photos[0];

    await redis.hmset(`location:${userId?.value}`, {
      photo: firstPhotoReference,
      city: tripDetails?.city,
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

    await redis.expire(`location${locationCount}:${userId?.value}`, 3600);

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

    await redis.expire(`location${locationCount}:${userId?.value}`, 3600);

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


//not using
export async function getGeoData({
  locations,
  lat,
  lng,
}: {
  locations: string[];
  lat: number;
  lng: number;
}) {
  try {
    const placeIds = await Promise.all(
      locations.map(async (location) => {
        const placeId = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&locationbias=circle%3A10000%40${lat}%2C${lng}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );
        const candidates = placeId.data.candidates;
        console.log(candidates);
        const firstPlaceId = candidates[0].place_id;
        return firstPlaceId;
      })
    );

    const geoData = await Promise.all(
      placeIds.map(async (placeId) => {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        );
        const place: Geometry = response.data.result.geometry;
        const lat = place.location.lat;
        const lng = place.location.lng;
        return { lat, lng };
      })
    );

    return {
      geoData,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
    };
  }
}

export async function getCachedLocationData({
  locationCount,
}: {
  locationCount: number;
}) {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");
    const cachedLocation = await redis.hgetall(
      `location${locationCount}:${userId?.value}`
    );
    console.log("cached location", cachedLocation); 
    if (cachedLocation?.details) {
      return {
        details: cachedLocation.details as Details,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
}
