import { z } from "zod";

export const MessageSchema = z.object({
  city: z.string(),
  isUserMessage: z.boolean(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
