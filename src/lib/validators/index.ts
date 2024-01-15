import { data } from "autoprefixer";
import { object, z } from "zod";

export const signUpSchema = object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  //add handle later
});

export const signInSchema = object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const newPasswordSchema = object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Minimum 6 characters required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const resetPasswordSchema = object({
  email: z.string().email({ message: "Email is required" }),
});

export const updateUserSchema = object({
  email: z.optional(z.string().email({ message: "Email is required" })),
  name: z.optional(z.string()),
  newPassword: z.optional(z.string().min(6)),
  confirmPassword: z.optional(z.string().min(6)),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const deleteUserSchema = object({
  deleteKeyWord: z.string(),
}).refine((data) => data.deleteKeyWord === "DELETE", {
  message: "Please type 'DELETE' to confirm",
  path: ["deleteKeyWord"],
});

export const calendarSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export const companionSchema = z.string();

export const citySearchSchema = z.object({
  city: z.string(),
  place_id: z.string(),
});

export const addBadgeSchema = z.string().min(1).max(15);

export const travelPlanningSchema = z.object({
  cityName: z.string(),
  placeId: z.string(),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  activities: z.object({
    message: z.string().optional(),
    activities: z.array(z.string()),
  }),
  companion: z.string(),
});

export const saveTripSchema = z.object({
  tripName: z.string(),
});
