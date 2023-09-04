import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";
import { MessageArraySchema } from "@/lib/validators/message";
import { NextResponse } from "next/server";
import { ChatGPTMessage } from "@/lib/openai-stream";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const body = await req.json();
  const { messages } = body;

/*   const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.city,
  }));

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });

  console.log(outboundMessages);

  if (!messages) {
    return new NextResponse("Messages are required", { status: 400 });
  }
 */
  console.log("API ROUTE CALLED");

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system", content: chatbotPrompt
      },
      {
        role: "user", content: messages
      }
    ],
    max_tokens: 10,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // Convert the response into a friendly text-stream
 const stream = OpenAIStream(response, {
  onStart: async () => {
    console.log("Stream started")
  },
  onCompletion: async (completion: string) => {
    console.log(completion)
  }
 })

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
