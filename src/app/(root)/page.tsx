import { headers } from "next/headers";
import Wrapper from "./components/Wrapper";

export default function HomePage() {
  const header = headers();
  const ip = header.get("x-forwarded-for")!;

  console.log("IP", ip);
  return <Wrapper />;
}
