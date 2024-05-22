"use server";
import { cookies } from "next/headers";

export const loginUser = async (email: string, password: string) => {
  const payload = { email, password };
  console.log(payload);

  const res = await fetch(`${process.env.SERVER_ADDRESS}/api/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  const result = await res.json();
  cookies().set("token", result?.data?.token);
  return result;
};
