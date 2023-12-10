"use client";

import { dateContext } from "@/context/message";
import React from "react";
import { Calendar as C } from "@/components/ui/calendar";
import FormPage from "../FormPage";
import { formContext } from "@/context/Form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { calendarSchema } from "@/lib/validators/travelPlanning";

type DateRange = {
  from: Date;
  to: Date;
};
export default function Calendar() {
  const { formData, prevStep, nextStep } = formContext();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <FormPage title="How long will you be away?" subTitle="">
      <form className="flex flex-col w-full gap-5">
        <div className="flex w-full justify-between">
          <C
            mode="range"
            selected={date}
            onSelect={setDate as any}
            max={7}
            className="rounded-md border"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => prevStep()} variant="outline">
            Back
          </Button>
          <Button
            formAction={() => {
              const result = calendarSchema.safeParse(date);
              console.log(date)
              if (!result.success) {
                toast.error("Please select a date range");
                return;
              }
              formData.date.from = result.data.from;
              formData.date.to = result.data.to;
              nextStep();
            }}
          >
            Next
          </Button>
        </div>
      </form>
    </FormPage>
  );
}
