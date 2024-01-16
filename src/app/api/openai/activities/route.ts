import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { city, companion } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Please generate atleast 10 activities for ${city}. The user is travelling with ${companion} so you should adapt the activities to fit that target group. Please seperate each activity 
          with a comma.The activity should only be one word. For example: "hiking, swimming, biking" no exceptions in how you write it consistently use the same format always respond with activity name and then a comma and then the next activity.`,
        },
        {
          role: "user",
          content: `${city}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    const responseText = completion.choices[0].message.content;
    const activites = responseText?.split(", ");
    console.log(activites);
    return NextResponse.json({ activites }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
