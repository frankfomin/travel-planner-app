import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    return NextResponse.json(session.user);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
