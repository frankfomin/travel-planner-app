import React from "react";
import UpdateEmailForm from "./UpdateEmailForm";
import axios from "axios";
import { headers } from "next/headers";

async function getSession() {
  const res = await axios
    .get("http://localhost:3000/api/getSession", {
      headers: Object.fromEntries(headers()),
    })
    .catch((err) => {
      console.log(err);
    });

  if (res && res.data) {
    return res.data;
  }
}

export default async function UpdateUserEmail() {
  const email = await getSession();

  return <UpdateEmailForm email={email} />;
}
