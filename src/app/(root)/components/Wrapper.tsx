"use client";

import { formContext } from "@/context/Form";
import Calendar from "./page2/Calendar";
import Companions from "./page3/Companions";
import Activities from "./page4/Activities";
import CitySearch from "./page1/CitySearch";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Wrapper() {
  const { step } = formContext();

  return (
    <>
      <Progress
        className="rounded-none"
        value={step === 1 ? 0 : ((step - 1) * 100) / 4}
      />
      <main className="sm:mt-32 mt-8">
        {step === 1 && <CitySearch />}
        {step === 2 && <Companions />}
        {step === 3 && <Calendar />}
        {step === 4 && <Activities />}

      </main>
    </>
  );
}
