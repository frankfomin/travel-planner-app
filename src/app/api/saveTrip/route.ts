import { db } from "@/db/db";
import { Location, LocationReviews, trip, users } from "@/db/schema";
import { Location as Locationtype, Place, Review } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

type TripDetails = {
  city: string;
  cityImage: string;
  imageWidth: string;
  imageHeight: string;
};

export async function POST(req: NextRequest) {
  try {
    const cookie = cookies();

    const userIdCookie = cookie.get("userId");

    const [body, session, tripDetails] = await Promise.all([
      await req.json(),
      await getServerSession(options),
      (await redis.hgetall(`tripDetails:${userIdCookie?.value}`)) as TripDetails,
    ]);

    const { tripName, cityDescription, locations } = body;

    if (!locations || !Array.isArray(locations)) {
      return new NextResponse("No valid locations provided", {
        status: 400,
      });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session?.user?.email!));

    if (!tripDetails) {
      return new NextResponse("No trip details found", { status: 401 });
    }

    if (!user || user.length === 0) {
      return new NextResponse("No user found", { status: 401 });
    }

    const userId = user[0].id;
    const tripId = nanoid();

    const city = tripDetails.city;
    const cityImage = tripDetails.cityImage;
    const imageWidth = +tripDetails.imageWidth;
    const imageHeight = +tripDetails.imageHeight;

    await Promise.all([
      db.insert(trip).values({
        name: tripName,
        city: city,
        description: cityDescription,
        tripId: tripId,
        userId: userId,
        photo_reference: cityImage,
        width: imageWidth,
        height: imageHeight,
      }),
      ...locations.map((location: Place) =>
        Promise.all([
          db.insert(Location).values({
            locationId: nanoid(),
            tripId: tripId,
            userId: userId,
            name: location.name,
            description: location.locationDescription,
            rating: location.rating?.toString(),
            photos: location.photos,
          }),
          ...(location?.reviews?.slice(0, 2).map((review: Review) =>
            db.insert(LocationReviews).values({
              locationId: nanoid(),
              tripId: tripId,
              userId: userId,
              authorName: review.author_name,
              reviewText: review.text,
              rating: review.rating.toString(),
              created_at: new Date(review.time),
            })
          ) || []),
        ])
      ),
    ]);

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
