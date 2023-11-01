"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { redis } from "../redis";

export async function saveTravellingWith(travellingWith: string) {
  const cookie = cookies();
  const userId = cookie.get("userId");

  await redis.hmset(`tripDetails:${userId?.value}`, {
    travellingWith,
  });

  return {
    success: "travellingWith saved",
  };
}
