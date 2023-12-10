import { db } from "@/db/db";
import { Location, LocationReviews, trip } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { tripId: string } }
) {
  try {

    console.log("params", params);
    const tripId = params.tripId;
    console.log("tripId", tripId);

    if (!tripId) {
      return new Response("Missing tripId", { status: 400 });
    }

    await Promise.all([
      db.delete(trip).where(eq(trip.tripId, tripId)),
      db.delete(Location).where(eq(Location.tripId, tripId)),
      db.delete(LocationReviews).where(eq(LocationReviews.tripId, tripId)),
    ]);

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal error", { status: 500 });
  }
}
