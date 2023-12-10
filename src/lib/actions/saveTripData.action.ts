"use server";

import { cookies } from "next/headers";
import { travelPlanningSchema } from "../validators/travelPlanning";
import { redis } from "../redis";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
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
    const activities = result.data.activities;
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

    const res = await redis.hmset(`tripDetails:${userId?.value}`, {
      city: cityName,
      place_id,
      startDate: startDateString,
      endDate: endDateString,
      message,
      activities,
      companion,
    });

    console.log(res);
  } catch (error) {
    console.log(error);
    return {
      error: "Internal error",
    };
  }
}
