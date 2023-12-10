"use client"

import { Button } from "@/components/ui/button";
import { formContext } from "@/context/Form";
import React from "react";

export default function Buttons() {
  const { nextStep, prevStep } = formContext();

  return (
    <div className="flex gap-2">
      <Button onClick={() => prevStep()} variant="outline">
        Back
      </Button>
      <Button onClick={() => nextStep()}>Next</Button>
    </div>
  );
}
