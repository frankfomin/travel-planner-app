import { db } from "@/db/db";
import { trip, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { session } from "@/types";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    const email = session?.user.email;

    if (!email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    //retrieve trips from database
    const user = await db.select().from(users).where(eq(users.email, email));

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

    console.log("TRIPS", trips);
    return NextResponse.json(trips);
  } catch (error) {
    console.log("TRIPS_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
