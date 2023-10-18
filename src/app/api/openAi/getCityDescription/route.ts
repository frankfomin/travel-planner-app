import { chatDescPrompt } from "@/helpers/constants/chatbot-prompt";
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
      console.log("CityDescription ERROR");

      return new NextResponse("User ID not found in cookies", { status: 400 });
    }

    const cachedTripData = await redis.lrange(userId.value, 0, -1);

    if (cachedTripData && cachedTripData.length > 0) {
      return NextResponse.json(JSON.stringify("Trip already in cache"), {
        status: 200,
      });
    }

    const cachedUserData: cachedUserData | null = await redis.hgetall(
      `user:${userId.value}`
    );

    if (!cachedUserData) {
      return NextResponse.redirect(new URL("/", res.url));
    }

    const city = cachedUserData.city;
    const placeId = cachedUserData.placeId;

    if (!city) {
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
          content: `${chatDescPrompt}`,
        },
        {
          role: "user",
          content: `${city}`,
        },
      ],
      max_tokens: 1,
      temperature: 0.6,
    });

    const responseText = completion.choices[0].message.content;

    await redis.hset(`cityDetails:${userId.value}`, {
      city,
      responseText,
    });

    return NextResponse.json(responseText);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
