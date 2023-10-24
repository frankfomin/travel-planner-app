import React from "react";
import axios from "axios";
import { headers } from "next/headers";
import UserFormData from "./UserFormData";

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

export default async function GetUserData() {
  const userData = await getSession();
  console.log("USERDATA",userData)


  return <UserFormData email={userData.email} name={userData.name} />;
}
