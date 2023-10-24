import * as argon2 from "argon2";
import { db } from "@/db/db";
import { NextResponse } from "next/server";
import { accounts, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Missing email or password", { status: 400 });
    }

    //check if user exists
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length > 0) {
      return new NextResponse("User already exists", {
        status: 400,
      });
    }

  
    const hashedPassword = await argon2.hash(password);

    //create user
    const newUser = await db.insert(users).values({
      id: nanoid(36),
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
