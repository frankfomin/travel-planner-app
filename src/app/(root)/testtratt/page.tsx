"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <>
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <Badge
        variant={`${isClicked ? "default" : "secondary"}`}
        className=" select-none hover:cursor-pointer"
        onClick={() => setIsClicked((prev) => !prev)}
      >
        Beach
      </Badge>
    </>
  );
}
