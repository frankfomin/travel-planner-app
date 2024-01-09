import { z } from "zod";

const activitiesSchema = z.object({
  message: z.string().optional(),
  activities: z.array(z.string()),
});

