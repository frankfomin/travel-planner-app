"use server";

import * as argon2 from "argon2";
import { db } from "@/db/db";
import { accounts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

/* export async function signUp(email: string, password: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length > 0) {
      return {
        userExists: true,
      };
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await db.insert(users).values({
      id: nanoid(36),
      email: email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "internal error",
    };
  }
}
 */

export async function getUserByEmail(email: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    return user[0];
  } catch (error) {
    return null;
  }
}
export async function getUserById(id: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));

    return user[0];
  } catch (error) {
    return null;
  }
}

export async function getAccountByUserId(id: string) {
  try {
    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, id));

    return account[0];
  } catch (error) {
    return null;
  }
}
