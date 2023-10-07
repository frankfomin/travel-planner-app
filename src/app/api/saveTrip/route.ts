import { db } from "@/db/db";
import {
  Location,
  LocationReviews,
  locationRelations,
  trip,
  tripRelations,
  users,
} from "@/db/schema";
import { Place, Review } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const { locations, e } = await req.json();

    locations.map((location: Place, i: number) => {
      console.log(`Location:${i}`, location);
    });

    if (!locations || !Array.isArray(locations)) {
      return new NextResponse("No valid locations provided", {
        status: 400,
      });
    }

    const email = "frank.fomin@gmail.com";
    const user = await db.select().from(users).where(eq(users.email, email));

    if (!user || user.length === 0) {
      return new NextResponse("No user found", { status: 401 });
    }

    const userId = user[0].id;
    const tripId = nanoid();

    await db.insert(trip).values({
      tripId: tripId,
      userId: userId,
      name: "Malmö",
    });

    const insertPromises = locations.map((location: Place) => {
      const locationInsertPromise = db.insert(Location).values({
        locationId: nanoid(),
        tripId: tripId,
        userId: userId,
        name: location.name,
        description: location.description,
        rating: location.rating?.toString(),
        photos: location.photos,
      });

      const reviewInsertPromises = location?.reviews?.map((review: Review) =>
        db.insert(LocationReviews).values({
          locationId: nanoid(),
          tripId: tripId,
          userId: userId,
          authorName: review.author_name,
          reviewText: review.text,
          rating: review.rating.toString(),
          created_at: new Date(review.time),
        })
      );

      return Promise.all([
        locationInsertPromise,
        ...(reviewInsertPromises || []),
      ]);
    });

    // Execute all insert operations concurrently and wait for them to complete
    await Promise.all(insertPromises);
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
