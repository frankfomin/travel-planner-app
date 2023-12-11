import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { config } from "../../../../auth";

export async function GET() {
  try {
    const session = await getServerSession(config);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    return NextResponse.json(session.user);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
