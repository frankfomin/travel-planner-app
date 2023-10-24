import { db } from "@/db/db";
import { users } from "@/db/schema";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, currentPassword, newPassword } = await req.json();

    if (currentPassword && newPassword) {
      const user = await db.select().from(users).where(eq(users.email, email));
      const password = user[0].password;
      const isValid = await argon2.verify(password!, currentPassword);

      if (!isValid) {
        return new Response("Invalid Password", { status: 401 });
      }

      const hashedPassword = await argon2.hash(newPassword);

      await db
        .update(users)
        .set({ password: hashedPassword, name: name })
        .where(eq(users.email, email));

      return new NextResponse("User Updated", { status: 200 });
    } else {
      await db.update(users).set({ name: name }).where(eq(users.email, email));

      return new NextResponse("User Updated", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
