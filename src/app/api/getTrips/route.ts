import { db } from "@/db/db";
import { trip, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { session } from "@/lib/types";



export async function GET() {
  try {
    const session: session | null = await getServerSession(options);

    console.log("GETTING TRIPS");

    console.log("SESSION", session);

    const email = session?.user.email;

    console.log("EMAIL", email);
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
