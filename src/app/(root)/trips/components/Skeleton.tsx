import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="flex gap-10 flex-shrink-0 overflow-hidden max-w-5xl"
        >
          <Skeleton className=" aspect-square max-w-xs max-h-56 w-96 " />
          <div className="mt-7 flex w-full justify-between pr-10">
            <div className="w-full flex flex-col gap-5">
              <Skeleton className=" h-6 w-[70%]" />
              <Skeleton className="h-5 w-[50%]" />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
