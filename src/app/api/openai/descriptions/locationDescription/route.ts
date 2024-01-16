import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { locationName, locationCount } = await req.json();

    const cookie = cookies();
    const userId = cookie.get("userId");

    const cachedLocation = await redis.hgetall(
      `location${locationCount}:${userId?.value}`
    );

    if (cachedLocation?.locDescription) {
      return NextResponse.json({
        description: cachedLocation?.locDescription,
      });
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

    const responseText = completion.choices[0].message.content;

    await redis.hmset(`location${locationCount}:${userId?.value}`, {
      locDescription: responseText,
    });

    await redis.expire(`location${locationCount}:${userId?.value}`, 3600);

    return NextResponse.json({ description: responseText }, { status: 200 });
  } catch (error) {
    console.log("[locationDescription/route.ts] error");
    return new NextResponse("internal error", { status: 500 });
  }
}
