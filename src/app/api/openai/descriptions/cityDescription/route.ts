import { chatDescPrompt } from "@/helpers/constants/chatbot-prompt";
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
    const cookie = cookies();
    const userId = cookie.get("userId");

    const header = headers();
    const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

    const currentRequestCount = await redis.incr(ip);
    await redis.expire(ip, 300);
    if (currentRequestCount > 20) {
      return new NextResponse("Too many requests", { status: 429 });
    }

    const cachedLoaction = await redis.hgetall(`location:${userId?.value}`);

    if (cachedLoaction?.cityDescription) {
      return NextResponse.json(
        { description: cachedLoaction.cityDescription as string },
        { status: 200 }
      );
    }
    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);
    console.log("TRIP DETAILS", tripDetails);
    if (!tripDetails) {
      return new NextResponse("No trip details found", { status: 404 });
    }

    const city = tripDetails.city;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${chatDescPrompt}`,
        },
        {
          role: "user",
          content: `${city}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;

    await redis.hmset(`location:${userId?.value}`, {
      cityDescription: responseText,
    });

    await redis.expire(`location:${userId?.value}`, 3600);

    return NextResponse.json({ description: responseText }, { status: 200 });
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
