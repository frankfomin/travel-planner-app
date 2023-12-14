import { Suspense } from "react";
import NoName from "./components/NoName";
import Loading from "./Loading";

export const dynamic = "force-dynamic";

export default function YourTripPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <NoName />
      </Suspense>
    </main>
  );
}
