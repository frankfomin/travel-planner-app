import { chatLocPrompt } from "@/helpers/constants/chatbot-prompt";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type cachedUserData = {
  city: string;
  activities: string;
  placeId: string;
};

export async function GET(res: NextResponse) {
  try {
    const userId = res.cookies.get("userId");

    if (!userId?.value) {
      console.log("CITYLOCATIONS ERROR");
      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    const cachedTripData = await redis.lrange(userId.value, 0, -1);

    if (cachedTripData && cachedTripData.length > 0) {
      return NextResponse.json(cachedTripData, { status: 200 });
    }

    const cachedUserData: cachedUserData | null = await redis.hgetall(
      `user:${userId.value}`
    );

    if (!cachedUserData) {
      if (!cachedUserData) {
        return NextResponse.redirect(new URL("/", res.url));
      }
    }

    const city = cachedUserData.city;

    const activities = cachedUserData.activities;

    if (!city || !activities) {
      return new NextResponse("No city or activities provided", {
        status: 400,
      });
    }

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

    console.log("responseText", responseText);

    const cityLocations = responseText?.split(", ");

    return NextResponse.json(cityLocations, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
