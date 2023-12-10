import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(100),
});

export type TsignUpSchema = z.infer<typeof signUpSchema>;
