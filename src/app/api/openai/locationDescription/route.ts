export const runtime = "edge";

export default async function POST(req: Request) {
  try {
    const { locationName } = await req.json();
  } catch (error) {}
}
