import { z } from "zod";

export const updateUserData = z
  .object({
    email: z.string().email(),
    name: z.string(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).max(100).optional(),
    confirmPassword: z.string().min(8).max(100).optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TupdateUserData = z.infer<typeof updateUserData>;
