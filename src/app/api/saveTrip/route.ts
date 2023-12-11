import { db } from "@/db/db";
import { location, locationReviews, trip, users } from "@/db/schema";
import { Location as Locationtype, Place, Review } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
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
      await getServerSession(),
      (await redis.hgetall(
        `tripDetails:${userIdCookie?.value}`
      )) as TripDetails,
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
        id: tripId,
        userId: userId,
        photo_reference: cityImage,
        width: imageWidth,
        height: imageHeight,
      }),
      ...locations.map((loc: Place) => {
        const locationId = nanoid();
        Promise.all([
          db.insert(location).values({
            id: locationId,
            tripId: tripId,
            name: loc.name,
            description: loc.description,
            rating: loc.rating?.toString(),
            photos: loc.photos,
            opening_hours: loc.opening_hours,
          }),
          ...loc.reviews.slice(0, 3).map((review: Review) => {
            return db.insert(locationReviews).values({
              id: nanoid(),
              locationId: locationId,
              tripId: tripId,
              author_name: review.author_name,
              relative_time_description: review.relative_time_description,
              text: review.text,
              rating: review.rating.toString(),
              profile_photo_url: review.profile_photo_url,
              author_url: review.author_url,
            });
          }),
        ]);
      }),
    ]);

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
