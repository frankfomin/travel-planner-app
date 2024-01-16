import { chatDescPrompt } from "@/helpers/constants/chatbot-prompt";
import { redis } from "@/lib/redis";
import { cookies, headers } from "next/headers";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function POST() {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");

    const header = headers();
    const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

    const currentRequestCount = await redis.incr(ip);
    await redis.expire(ip, 300);
    if (currentRequestCount > 20) {
      return { rateLimit: "Too many requests" };
    }

    const cachedLoaction = await redis.hgetall(`location:${userId?.value}`);

    if (cachedLoaction?.cityDescription) {
      return {
        responseText: cachedLoaction.cityDescription as string,
      };
    }

    const tripDetails = await redis.hgetall(`tripDetails:${userId?.value}`);

    if (!tripDetails) {
      return {
        error: "No trip details found",
      };
    }

    const city = tripDetails.city;

    const completion = await openai.createChatCompletion({
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
  } catch (error) {}
}
