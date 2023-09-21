import {
  chatLocPrompt,
} from "@/helpers/constants/chatbot-prompt";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { city, activities } = await req.json();

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

    return NextResponse.json(responseText);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
