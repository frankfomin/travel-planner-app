"use server";

import { db } from "@/db/db";
import { location, locationReviews, trip, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { config } from "@/lib/auth";
import { OpeningHours, Photo, Review } from "@/types";
import { nanoid } from "nanoid";

export async function saveTrip({
  saveDescription = false,
  saveTrip = false,
  cityDescription,
  tripId,
  city,
  photo_reference,
  width,
  height,
}: {
  saveDescription?: boolean;
  saveTrip?: boolean;
  cityDescription?: string;
  tripId: string;
  city?: string;
  photo_reference?: string;
  width?: number;
  height?: number;
}) {
  try {
    const session = await getServerSession(config);
    console.log("SESSION ", session);
    if (!session?.user?.email) {
      return {
        unauthorized: true,
      };
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email));

    if (saveDescription) {
      await db
        .update(trip)
        .set({ description: cityDescription })
        .where(eq(trip.id, tripId));
    } else {
      await db
        .update(trip)
        .set({
          userId: user[0].id,
          city,
          photo_reference,
          width,
          height,
        })
        .where(eq(trip.id, tripId));
    }
  } catch (error) {}
}

export async function saveLocation({
  tripId,
  name,
  description,
  rating,
  photos,
  opening_hours,
  reviews,
}: {
  tripId: string;
  name: string;
  description: string;
  rating: number;
  photos: Photo;
  opening_hours: OpeningHours;
  reviews: Review[];
}) {
  try {
    const locationId = nanoid();
    await Promise.all([
      db.insert(location).values({
        id: locationId,
        tripId,
        name,
        description,
        rating: rating.toString(),
        photos,
        opening_hours,
      }),
      ...reviews.map((review) => {
        return db.insert(locationReviews).values({
          id: nanoid(),
          locationId,
          tripId,
          author_name: review.author_name,
          rating: review.rating.toString(),
          relative_time_description: review.relative_time_description,
          text: review.text,
          profile_photo_url: review.profile_photo_url,
          author_url: review.author_url,
        });
      }),
    ]);
  } catch (error) {}
}
