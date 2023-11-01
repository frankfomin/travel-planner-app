"use server";

import { db } from "@/db/db";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redis } from "../redis";
import { nanoid } from "nanoid";

const schema = z.object({
  city: z.string(),
  place_id: z.string(),
});

export async function SaveCityPlaceId(data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      error: "Failed",
    };
  }
  const cookie = cookies();
  const city = result.data.city;
  const place_id = result.data.place_id;

  const userId = cookie.get("userId");
  if (!userId?.value) {
    cookie.set("userId", nanoid());
    const userId = cookie.get("userId");
    await redis.hmset(`tripDetails:${userId?.value}`, {
      city,
      place_id,
    });
  } else {
    await redis.hmset(`tripDetails:${userId?.value}`, {
      city,
      place_id,
    });
  }

  return {
    success: "citydetails saved",
  };
}
