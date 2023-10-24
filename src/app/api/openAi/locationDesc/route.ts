import { chatLocPrompt } from "@/helpers/constants/chatbot-prompt";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get("userId");

    if (!userId?.value) {
      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    const cachedTripData = await redis.lrange(userId.value, 0, -1);

    if (cachedTripData && cachedTripData.length > 0) {
      console.log("cachedTripData", cachedTripData);
      return NextResponse.json(JSON.stringify("Trip already in cache"), {
        status: 200,
      });
    }

    const { locationName } = await req.json();

    if (!locationName) {
      return new NextResponse("No location name provided", { status: 400 });
    }

    if (!openai.apiKey) {
      return new NextResponse("No OpenAI API key provided", { status: 500 });
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

    return NextResponse.json(responseText);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
