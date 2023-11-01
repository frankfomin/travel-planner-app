"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { redis } from "../redis";
import { nanoid } from "nanoid";

const schema = z.object({
  date: z.object({
    from: z.date().refine((d) => d > new Date(), {
      message: "Date should be in the future",
    }),
    to: z.date().refine((d) => d > new Date(), {
      message: "Date should be in the future",
    }),
  }),
});

export async function saveDate(data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      error: "Failed",
    };
  }
  const cookie = cookies();
  const startDate = result.data.date.from;
  const endDate = result.data.date.to;
  // how can i convert this date  2023-11-24T23:00:00.000Z
  //to 2023-11-24

  const startDateString = startDate.toISOString().split("T")[0];
  const endDateString = endDate.toISOString().split("T")[0];

  const userId = cookie.get("userId");

  await redis.hmset(`tripDetails:${userId?.value}`, {
    startDate: startDateString,
    endDate: endDateString,
  });

  return {
    success: "Date saved",
  };
}
