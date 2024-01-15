import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MapCardLoading() {
  return (
    <Card className="flex flex-col gap-3 aspect-video w-96 shadow-lg bg-transparent border-none">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[45%]" />
        <Skeleton className="h-6 w-[20%]" />
      </div>
      <CardContent className="p-0 flex flex-col gap-5">
        <Skeleton className="aspect-video " />
      </CardContent>
    </Card>
  );
}
