"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { activitiesContext, pageIndex } from "@/context/message";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import ActivityBadge from "./ActivityBadge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { saveActivities } from "@/lib/actions/saveActivities";
import { useRouter } from "next/navigation";

export default function Activities() {
  const router = useRouter();
  const { index } = pageIndex();
  const { activities } = activitiesContext();
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    if (index === 3 && !data && !isLoading) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.get("/api/openAi/getActivities", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data as string[];
    },
  });

  const schema = z.object({
    message: z.string().optional(),
    activities: z.array(z.string()),
  });

  return (
    <>
      {isMounted && (
        <section className="flex flex-col items-center absolute w-full -right-[300%] ">
          <div className=" max-w-2xl flex flex-col gap-5">
            <h3 className="text-5xl">Let&apos;s plan your adventure</h3>
            {isLoading ? (
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="w-14 h-5 rounded-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {data?.map((activity, i) => (
                  <ActivityBadge activity={activity} key={i} />
                ))}
              </div>
            )}
            <form
              action={async (formData: FormData) => {
                const message = {
                  message: formData.get("message"),
                  activities: activities,
                };

                const result = schema.safeParse(message);

                if (!result.success) {
                  toast.error("Please select atleast one activity");
                  return;
                }

                const res = await saveActivities(result.data);

                if (res.error) {
                  toast.error(res.error);
                  return;
                }

                router.push("/your-trip");
              }}
            >
              <Textarea name="message" />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
