import { db } from "@/db/db";
import { trip, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";

/* {
  user: {
    name: 'Frank Fomin',
    email: 'frank.fomin@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocIgG-QO5fhMISrQf8EP8fRl7rNpEyJfITO3Vk2Z1fJAzKw=s96-c'
  }
} */
type session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export async function POST() {
  try {
    const session: session | null = await getServerSession(handler);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //retrieve trips from database
    console.log(session);
    const user = await db
      .select()
      .from(users)
      .where(
        eq(users.email, session ? session.user.email : "frank.fomin@gmail.com")
      );

    if (!user || user.length === 0) {
      return new Response("User not found", { status: 404 });
    }

    const trips = await db
      .select()
      .from(trip)
      .where(eq(trip.userId, user[0].id));

    if (!trips || trips.length === 0) {
      return new Response("no trips found", { status: 404 });
    }

    console.log("TRIPS", trips);
    return NextResponse.json(trips);
  } catch (error) {
    console.log("TRIPS_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
