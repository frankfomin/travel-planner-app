import { z } from "zod";

export const saveTripSchema = z.object({
  TripName: z.string().min(1).max(100),
});

export type TsaveTripSchema = z.infer<typeof saveTripSchema>;
