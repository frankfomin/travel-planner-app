"use server";

import axios from "axios";
import { Photo } from "@/types";
import { redis } from "../redis";
import { cookies } from "next/headers";

export async function getCityImage(city: unknown, placeId: unknown) {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?fields=photos&place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
  );

  const cookie = cookies();

  const userId = cookie.get("userId");

  const photos = data.result.photos as Photo[];

  console.log("PHOTOS", photos);

  const firstPhotoReference = photos[0];

  await redis.hmset(`tripDetails:${userId?.value}`, {
    cityImage: firstPhotoReference.photo_reference,
    imageWidth: firstPhotoReference.width,
    imageHeight: firstPhotoReference.height,
  });

  return firstPhotoReference;
}
