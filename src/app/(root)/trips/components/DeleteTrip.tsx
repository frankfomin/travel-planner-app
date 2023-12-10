import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default function DeleteTrip({
  tripName,
  tripId,
}: {
  tripName: string;
  tripId: string;
}) {
  async function handleSubmit() {
    "use server";
    console.log("submitting")
    await axios.delete(`http://localhost:3000/api/DeleteTrip/${tripId}`);

    revalidatePath("http://localhost:3000/trips");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
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
          className="feather feather-more-vertical"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {tripName}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form className="flex gap-5" action={handleSubmit}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild >
              <Button type="submit" variant="destructive">
                Continue
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
