"use server";

import { db } from "@/db/db";

import { eq } from "drizzle-orm";
import { location, locationReviews, trip, users } from "@/db/schema";
import { auth } from "@/auth";
import { saveTripSchema } from "../validators";
import { redis } from "../redis";
import { cookies } from "next/headers";
import { Location, OpeningHours, Place, city } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function getTrips() {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return {
        unauthorized: true,
      };
    }
    const user = await db.select().from(users).where(eq(users.email, email));

    const trips = await db
      .select()
      .from(trip)
      .where(eq(trip.userId, user[0].id));

    return {
      trips: trips,
    };
  } catch (error) {}
}

export async function getTripLocations(tripId: string) {
  try {
    const locations = await db.query.location.findMany({
      where: (location, { eq }) => eq(location.tripId, tripId),
      with: {
        reviews: true,
        trip: true,
      },
    });

    return {
      locations,
    };
  } catch (error) {}
}

export async function saveTrip({
  data,
  length,
}: {
  data: unknown;
  length: number;
}) {
  try {
    const cookie = cookies();
    const userId = cookie.get("userId");
    const result = saveTripSchema.safeParse(data);

    if (!result.success) {
      return {
        error: result.error,
      };
    }
    const { tripName } = result.data;

    const locations = await Promise.all(
      Array.from({ length }, async (_, i) => {
        const location: Location | null = await redis.hgetall(
          `location${i}:${userId?.value}`
        );
        console.log(`location${i}:${userId?.value}`);
        console.log(location);
        return location;
      })
    );

    console.log(locations);

    const [city, session] = await Promise.all([
      (await redis.hgetall(`location:${userId?.value}`)) as city | null,
      auth(),
    ]);

    if (!session?.user) {
      return {
        unauthorized: true,
      };
    }
    const tripId = uuidv4();
    console.log("tripId", tripId);
    //here
    await Promise.all([
      db.insert(trip).values({
        // @ts-ignore
        id: tripId,
        name: tripName,
        userId: session?.user?.id,
        description: city?.cityDescription,
        width: city?.photo.width,
        height: city?.photo.height,
        photo_reference: city?.photo.photo_reference,
        city: city?.city,
      }),
      //here
      Promise.all(
        locations.map(async (loc) => {
          console.log(loc);
          const locationId = uuidv4();
          await db.insert(location).values({
            id: locationId,
            tripId,
            name: loc?.details.name as string,
            description: loc?.locDescription,
            rating: loc?.details.rating?.toString(),
            photos: loc?.details.photos,
            opening_hours: loc?.details.opening_hours,
          });

          await Promise.all(
            (loc?.details?.reviews || []).map(async (review) => {
              await db.insert(locationReviews).values({
                id: uuidv4(),
                locationId,
                tripId,
                author_name: review.author_name,
                rating: review.rating.toString(),
                relative_time_description: review.relative_time_description,
                text: review.text,
                profile_photo_url: review.profile_photo_url,
                author_url: review.author_url,
              });
            })
          );
        })
      ),
    ]);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
}
/* const locationId = nanoid();
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
    ]); */
