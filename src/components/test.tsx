"use client"


import { Input } from "@/components/ui/input";
import { formContext } from "@/context/Form";
import React from "react";
import { experimental_useOptimistic as useOptimistic } from "react";

export default function Test() {
  const { prevStep, nextStep, step, formData: formdasd } = formContext();
  const [optimisticStep, addOptimisticStep] = useOptimistic(
    {
      step,
      sending: false,
    },
    (state, newStep) => ({
      ...state,
      step: newStep as number,
      sending: true,
    })
  );

  async function increase() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    nextStep();
  }

  async function decrease() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    prevStep();
  }

  async function handleSubmit(formData: FormData) {
    const data = formData.get("vas");
    if (!data) throw new Error("No data");
    formdasd.cityName = data.toString();
  }
  return (
    <main>
      {step}
      {formdasd.cityName}
      <form action={handleSubmit}>
        <Input name="vas" />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          addOptimisticStep(step + 1);
          increase();
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          addOptimisticStep(step - 1);
          decrease();
        }}
      >
        Prev
      </button>
      <div>Optimistic step: {optimisticStep.step}</div>
    </main>
  );
}
