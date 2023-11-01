import { chatLocPrompt } from "@/helpers/constants/chatbot-prompt";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { cookies } from "next/headers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    if (!tripDetails) {
      return new NextResponse("No trip details found", { status: 400 });
    }
    const city = tripDetails.city;
    const activities = tripDetails.activities;

    if (!openai.apiKey) {
      return new NextResponse("No OpenAI API key provided", { status: 500 });
    }

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

    return NextResponse.json(cityLocations, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
