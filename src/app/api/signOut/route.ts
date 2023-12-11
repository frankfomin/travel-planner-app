import { db } from "@/db/db";
import { securityLogs, users } from "@/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const email = userSession.data.email;
    const name = userSession.data?.name
      ? userSession.data?.name
      : userSession.data.email;

    const userId = await db.select().from(users).where(eq(users.email, email));

    console.log("USERID:", userId[0].id);
    if (userId.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ip = await axios.get("https://api.ipify.org?format=json");
    const ipAddress = ip.data.ip;

    await db.insert(securityLogs).values({
      userId: userId[0].id,
      ip: ipAddress,
      provider: name,
      type: "Signed out",
    })
  
    return new NextResponse("Signed out", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
