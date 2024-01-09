"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { deleteUserSchema, updateUserInfoSchema } from "@/lib/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../ui/SubmitButton";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { deleteUser } from "@/lib/actions/user.actions";

export default function DeleteUserForm({
  userId,
}: {
  userId: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof deleteUserSchema>>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      deleteKeyWord: "",
    },
  });

  async function onSubmit(data: z.infer<typeof deleteUserSchema>) {
    if (userId) {
      setIsLoading(true);
      await deleteUser(userId);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="deleteKeyWord"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} variant="destructive">
          DELETE
          {isLoading && <Icons.spinner className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
