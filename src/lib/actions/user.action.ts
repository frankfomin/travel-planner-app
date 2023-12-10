"use server";

import * as argon2 from "argon2";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function signUp(email: string, password: string) {
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

export async function updateUser() {
    try {
        
    } catch (error) {
        
    }
}



/* import { db } from "@/db/db";
import { securityLogs, users } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

type userSession = {
  data: {
    email: string;
    name: string;
  };
};

export async function GET() {
  try {
    const userSession: userSession = await axios.get(
      "http://localhost:3000/api/getSession",
      {
        headers: Object.fromEntries(headers()),
      }
    );

    if (!userSession) {
      return new Response("Unauthorized", { status: 401 });
    }

    const email = userSession.data.email;
    const name = userSession.data?.name
      ? userSession.data?.name
      : userSession.data.email;

    const userId = await db.select().from(users).where(eq(users.email, email));

    console.log("USERID:", userId[0].id);
    if (userId.length === 0) {
      return false;
    }

    const ip = await axios.get("https://api.ipify.org?format=json");
    const ipAddress = ip.data.ip;

    await db.insert(securityLogs).values({
      userId: userId[0].id,
      ip: ipAddress,
      provider: name,
      type: "Signed out",
    })
  
    return new Response("Signed out", { status: 200 });
  } catch (error) {
    return new Response("Internal Error", { status: 500 });
  }
}
 */

