import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className=" max-w-xs">
      <Label>Email</Label>
      <div className="relative flex items-center ">
        <Input />
        <Skeleton className="absolute ml-2 h-6 w-[85%]" />
      </div>
    </div>
  );
}
