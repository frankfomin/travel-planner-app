import OpenAI from "openai";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Please generate atleast 10 activities for ${city} with a comma seperating each activity 
          the activity should only be one word. For example: "hiking, swimming, biking" no exceptions in how you write it consistently use the same format.`,
        },
        {
          role: "user",
          content: `${city}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;
    const activites = responseText?.split(", ");

    return NextResponse.json(activites);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
