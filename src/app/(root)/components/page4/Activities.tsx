"use client";

import { activitiesContext } from "@/context/message";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ActivityBadge from "./ActivityBadge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormPage from "../FormPage";
import { formContext } from "@/context/Form";
import {
  addBadgeSchema,
  travelPlanningSchema,
} from "@/lib/validators/travelPlanning";
import { saveTripData } from "@/lib/actions/saveTripData.action";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Activities() {
  const router = useRouter();
  const { formData, nextStep, prevStep, step } = formContext();
  const { activities: a } = activitiesContext();
  const ref = useRef<HTMLFormElement>(null);
  /*  useEffect(() => {
    if (step === 3 && !data) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
 */
  /* onst { mutate, isLoading, data } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.get("/api/openAi/getActivities", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data as string[];
    },
  }); */

  const data = [
    "Hiking",
    "Skiing",
    "Surfing",
    "Camping",
    "Fishing",
    "Sightseeing",
    "Shopping",
    "Eating",
    "Drinking",
    "Partying",
    "Relaxing",
    "Museum",
    "Concert",
    "Theater",
    "Sport",
    "Spa",
    "Beach",
    "Pool",
    "Theme Park",
  ];

  const [activities, setActivities] = useState(data);

  return (
    <FormPage
      title="What are you going to do?"
      subTitle="feel free to add an extra option if you're feeling extra adventurous!
    "
    >
      <div className="w-full grid gap-5">
        <div className="flex flex-wrap max-w-lg w-full gap-3">
          {activities?.map((activity, i) => (
            <ActivityBadge activity={activity} key={i} />
          ))}
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
                  ...prevActivities,
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
          <Textarea className="w-full" name="message" />
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
