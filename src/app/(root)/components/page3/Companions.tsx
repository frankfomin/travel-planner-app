"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formContext } from "@/context/Form";
import React from "react";
import Buttons from "../Buttons";
import FormPage from "../FormPage";
import { toast } from "sonner";
import { companionSchema } from "@/lib/validators/travelPlanning";
import Image from "next/image";

export default function Companions() {
  const { formData, nextStep, prevStep } = formContext();
  const [companion, setCompanion] = React.useState<string>();
  const companions = [
    {
      companion: "Family",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-users h-6 w-6"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      companion: "Partner",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-heart h-6 w-6"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
    },
    {
      companion: "Friends",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-users h-6 w-6"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      companion: "Solo",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-user h-6 w-6"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      companion: "Business",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-briefcase h-6 w-6"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
  ];

  return (
    <FormPage title="Who are you travelling with?" subTitle="Choose one">
      <form className="flex flex-col w-full gap-5">
        <div className="flex sm:gap-4 gap-2 flex-wrap ">
          {companions.map((item, i) => (
            <Badge
              key={i}
              className=" select-none hover:cursor-pointer sm:text-lg text-base "
              variant={item.companion === companion ? "default" : "secondary"}
              onClick={() => {
                setCompanion(item.companion);
                formData.companions = item.companion;
              }}
            >
              <div className="flex items-center gap-3">
                <p>{item.companion}</p>
                {item.icon}
              </div>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={() => prevStep()} variant="outline">
            Back
          </Button>
          <Button
            formAction={() => {
              const result = companionSchema.safeParse(companion);
              if (!result.success) {
                toast.error("Please select one of the options");
                return;
              }
              formData.companions = result.data;
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
