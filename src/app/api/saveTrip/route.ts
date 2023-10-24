import { db } from "@/db/db";
import {
  Location,
  LocationReviews,
  locationRelations,
  trip,
  tripRelations,
  users,
} from "@/db/schema";
import { Location as Locationtype, Place, Review } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { redis } from "@/lib/redis";

type session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const session: session | null = await getServerSession(options);

    const userIdCookie = req.cookies.get("userId");

    if (!userIdCookie?.value) {
      return new Response("User Id not found in cookies", { status: 400 });
    }

    const { tripName, locations } = await req.json();
    await Promise.all([
      await redis.del(userIdCookie.value),
      await redis.del(`userid:${userIdCookie.value}`),
      await redis.del(`cityDetails:${userIdCookie.value}`),
    ]);

    if (!locations || !Array.isArray(locations)) {
      return new NextResponse("No valid locations provided", {
        status: 400,
      });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session?.user?.email!));

    if (!user || user.length === 0) {
      return new NextResponse("No user found", { status: 401 });
    }

    const userId = user[0].id;
    const tripId = nanoid();

    await db.insert(trip).values({
      tripId: tripId,
      userId: userId,
      name: tripName,
    });

    const insertPromises = locations.map((location: Place) => {
      const locationInsertPromise = db.insert(Location).values({
        locationId: nanoid(),
        tripId: tripId,
        userId: userId,
        name: location.name,
        description: location.locationDescription,
        rating: location.rating?.toString(),
        photos: location.photos,
      });

      const reviewInsertPromises = location?.reviews
        ?.slice(0, 2)
        .map((review: Review) =>
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
