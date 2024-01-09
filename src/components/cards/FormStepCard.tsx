"use client";

import { formContext } from "@/context/Form";

import { Progress } from "@/components/ui/progress";
import CitySearch from "../forms/search/CitySearch";
import Companions from "../forms/Companions";
import Calendar from "../forms/Calendar";
import Activities from "../forms/Activities";

export default function FormStepCard() {
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
