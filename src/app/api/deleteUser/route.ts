import { db } from "@/db/db";
import { Location, LocationReviews, accounts, trip, users } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/getSession", {
      headers: Object.fromEntries(headers()),
    });

    const email = data.email;

    const user = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Promise.all([
      db.delete(users).where(eq(users.id, user[0].id)),
      db.delete(trip).where(eq(trip.userId, user[0].id)),
      db.delete(Location).where(eq(Location.userId, user[0].id)),
      db.delete(LocationReviews).where(eq(LocationReviews.userId, user[0].id)),
      db.delete(accounts).where(eq(accounts.userId, user[0].id)),
    ]);

    return new NextResponse("User Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
