"use server";

import { db } from "@/db/db";
import { accounts, location, trip, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateUserSchema } from "../validators";
import bcrypt from "bcryptjs";

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

export async function deleteUser(userId: string) {
  try {
    await Promise.all([
      db.delete(users).where(eq(users.id, userId)),
      db.delete(accounts).where(eq(accounts.userId, userId)),
    ]);
  } catch (error) {}
}

export async function updateUser({
  data,
  userId,
}: {
  data: unknown;
  userId: string;
}) {
  try {
    const result = updateUserSchema.safeParse(data);
    if (!result.success) {
      return {
        validationError: true,
      };
    }

    const { email, name, newPassword } = result.data;

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, userId));
    }

    if (name) {
      await db.update(users).set({ name }).where(eq(users.id, userId));
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: true,
    };
  }
}
