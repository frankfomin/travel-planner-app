"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { redis } from "../redis";
import { redirect } from "next/navigation";

const schema = z.object({
  message: z.string().optional(),
  activities: z.array(z.string()),
});

export async function saveActivities(data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      error: "Failed",
    };
  }
  const message = result.data.message;
  const activities = result.data.activities;

  const cookie = cookies();
  const userId = cookie.get("userId");

  console.log("HELLO ACTIVITIES: ", activities);
  await redis.hmset(`tripDetails:${userId?.value}`, {
    message,
    activities,
  });

  redirect("http://localhost:3000/your-trip");
}
