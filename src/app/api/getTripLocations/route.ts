import { db } from "@/db/db";
import { Location, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

type session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export async function POST(req: Request) {
  try {
    const { tripId } = await req.json();
    const session: session | null = await getServerSession(options);

    if (!tripId) {
      return new NextResponse("No tripId", { status: 401 });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session?.user?.email!));

    if (!user || user.length === 0) {
      return new NextResponse("no userId found", { status: 404 });
    }

    const tripLocations = await db
      .select()
      .from(Location)
      .where(and(eq(Location.tripId, tripId), eq(Location.userId, user[0].id)));

    if (!tripLocations || tripLocations.length === 0) {
      return new NextResponse("no tripLocations found", { status: 404 });
    }

    return NextResponse.json(tripLocations);
  } catch (error) {
    console.log("TRIP_LOCATIONS_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
