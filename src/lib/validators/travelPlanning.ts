import { z } from "zod";

const activitiesSchema = z.object({
  message: z.string().optional(),
  activities: z.array(z.string()),
});

export const calendarSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export type TcalendarSchema = z.infer<typeof calendarSchema>;

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
