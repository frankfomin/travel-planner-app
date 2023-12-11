import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { users } from "@/db/schema";
import { config } from "../../../../auth";

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
    const session: session | null = await getServerSession(config);

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

    const locations = await db.query.location.findMany({
      where: (location, { eq }) => eq(location.tripId, tripId),
      with: {
          reviews: true,
      }
    });

    console.log("LOCATIONS", locations)

    if (!locations) {
      return new NextResponse("no locations", { status: 404 });
    }

    return NextResponse.json(locations);
  } catch (error) {
    console.log("TRIP_LOCATIONS_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
