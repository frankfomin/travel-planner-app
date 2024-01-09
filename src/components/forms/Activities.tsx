"use client";

import { activitiesContext } from "@/context/message";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ActivityBadge from "../ui/ActivityBadge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormPage from "../cards/FormCard";
import { formContext } from "@/context/Form";

import { saveTripData } from "@/lib/actions/saveTripData.action";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getActivites } from "@/lib/actions/city.actions";
import { addBadgeSchema, travelPlanningSchema } from "@/lib/validators";

export default function Activities() {
  const router = useRouter();
  const { formData, nextStep, prevStep, step } = formContext();
  const [activities, setActivities] = useState<string[]>();

  const { activities: a } = activitiesContext();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!data) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate, isLoading, data } = useMutation({
    mutationFn: async () => {
      const { activites } = await getActivites({
        city: formData.cityName,
        companion: formData.companions,
      });

      return activites;
    },
    onSuccess: (data) => {
      setActivities(data);
    },
  });
  console.log(activities);
  return (
    <FormPage
      title="What are you going to do?"
      subTitle="Choose as many as you want"
    >
      <div className="w-full grid gap-5">
        <div className="flex flex-wrap max-w-lg w-full sm:gap-3 gap-2">
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-14 h-5 rounded-full" />
              ))}
            </>
          ) : (
            <>
              {activities?.map((activity, i) => (
                <ActivityBadge activity={activity} key={i} />
              ))}
            </>
          )}
          <Badge variant="outline">
            <form
              ref={ref}
              action={(formData: FormData) => {
                const activity = formData.get("activity");
                console.log(activity);
                const result = addBadgeSchema.safeParse(activity);
                if (!result.success) {
                  toast.error("Please enter a valid activity");
                  return;
                }
                setActivities((prevActivities) => [
                  ...(prevActivities ?? []),
                  result.data,
                ]);
                ref.current?.reset();
              }}
            >
              <input
                placeholder="Add+"
                name="activity"
                size={1}
                className="text-lg focus:w-auto placeholder:text-current bg-transparent focus:outline-none  "
              />
            </form>
          </Badge>
        </div>
        <form className="grid gap-5 w-full">
          <div className="flex gap-2">
            <Button onClick={() => prevStep()} variant="outline">
              Back
            </Button>
            <Button
              formAction={async (data: FormData) => {
                const message = {
                  cityName: formData.cityName,
                  placeId: formData.placeId,
                  date: {
                    from: formData.date.from,
                    to: formData.date.to,
                  },
                  activities: {
                    activities: a,
                    message: data.get("message")?.toString(),
                  },
                  companion: formData.companions,
                };

                const result = travelPlanningSchema.safeParse(message);

                if (!result.success) {
                  toast.error("Please select atleast one activity");
                  console.log(result.error);
                  return;
                }

                const res = await saveTripData(result.data);

                if (res?.error) {
                  toast.error(res.error);
                  return;
                }

                router.push("/your-trip");
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </FormPage>
  );
}
