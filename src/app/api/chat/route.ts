// app/api/completion/route.ts

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { city, activities, prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "system",
        content: `${chatbotPrompt} `,
      },
      {
        role: "user",
        content: `${prompt} ${city} ${activities} `,
      },
    ],
    max_tokens: 200,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
