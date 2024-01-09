"use server";

import { db } from "@/db/db";

import { eq } from "drizzle-orm";
import { trip, users } from "@/db/schema";
import { auth } from "@/auth";

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
      },
    });

    return {
      locations,
    };
  } catch (error) {}
}
