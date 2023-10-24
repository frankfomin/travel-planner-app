import { db } from "@/db/db";
import { securityLogs, users } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type userSession = {
  data: {
    email: string;
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

    console.log("USER SESSION", userSession);

    const user = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const securityLog = await db
      .select()
      .from(securityLogs)
      .where(eq(securityLogs.userId, user[0].id));
    if (!securityLog) {
      return new NextResponse("Unauthorized", { status: 532 });
    }

    return NextResponse.json(securityLog);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
