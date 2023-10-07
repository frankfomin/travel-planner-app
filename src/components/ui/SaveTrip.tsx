"use client";

import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./button";
import { Dialog, DialogFooter, DialogHeader } from "./dialog";
import SingInForm from "./SignInForm";
import { use, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

type SaveTripProps = {
  locations: string[];
};

export default function SaveTrip({ locations }: SaveTripProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("LOCATIONS", locations);

    //eslint-disable-next-line
  }, [locations]);

  const { mutate, isLoading, data } = useMutation({
    mutationKey: ["saveTrip"],
    mutationFn: async (locations: string[]) => {
      const response = await fetch("/api/saveTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locations, city: "test" }),
      });

      const responseData = await response.json();
      return responseData;
    },
  });
  return (
    <>
      {isMounted ? (
        <Dialog>
          <DialogTrigger>
            <Button>Save trip</Button>
          </DialogTrigger>
          <DialogContent className="flex h-full w-full justify-center items-center absolute  ">
            <DialogHeader></DialogHeader>
            <SingInForm />
            <Button onClick={() => mutate(locations)}>Save</Button>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
