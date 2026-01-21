import { chatLocPrompt } from "@/helpers/constants/chatbot-prompt";
import { redis } from "@/lib/redis";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const header = headers();
    const cookie = cookies();
    const userId = cookie.get("userId");

    const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

    const currentRequestCount = await redis.incr(ip);
    await redis.expire(ip, 5);
    if (currentRequestCount > 20) {
      return new NextResponse("ratelimit", { status: 429 });
    }
    const cachedLocations: string[] | null = await redis.get(
      `locations:${userId?.value}`
    );

    if (cachedLocations) {
      if (cachedLocations.length > 0) {
        return NextResponse.json(
          { locations: cachedLocations },
          { status: 200 }
        );
      }
    }

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    if (!tripDetails) {
      return new NextResponse("No trip details found", { status: 404 });
    }
    const city = tripDetails.city;
    const activities = tripDetails.activities;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${chatLocPrompt}`,
        },
        {
          role: "user",
          content: `${city} ${activities}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;

    const cityLocations = responseText?.split(", ");

    await redis.set(`locations:${userId?.value}`, cityLocations);
    await redis.expire(`locations:${userId?.value}`, 3600);
    return NextResponse.json({ locations: cityLocations }, { status: 200 });
  } catch (error) {
    console.log("[cityLoactions/route.ts] error");
    return new NextResponse("Internal error", { status: 500 });
  }
}
