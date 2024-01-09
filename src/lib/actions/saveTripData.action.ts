"use server";

import { cookies } from "next/headers";
import { redis } from "../redis";
import { nanoid } from "nanoid";
import { travelPlanningSchema } from "../validators";
export async function saveTripData(data: unknown) {
  try {
    const result = travelPlanningSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      return {
        error: "Failed",
      };
    }
    const cityName = result.data.cityName;
    const startDate = result.data.date.from;
    const endDate = result.data.date.to;
    const message = result.data.activities.message
      ? result.data.activities.message
      : "";
    const a = result.data.activities.activities;
    const activities = a.join(", ");

    const companion = result.data.companion;
    const place_id = result.data.placeId;

    const cookie = cookies();
    const u = cookie.get("userId");

    if (!u) {
      cookie.set("userId", nanoid());
    }

    const userId = cookie.get("userId");

    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    const [res, keys] = await Promise.all([
      redis.hmset(`tripDetails:${userId?.value}`, {
        city: cityName,
        place_id,
        startDate: startDateString,
        endDate: endDateString,
        message,
        activities,
        companion,
      }),
      redis.keys(`location*:${userId?.value}`),
    ]);

    for (const key of keys) {
      await redis.del(key);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal error",
    };
  }
}
