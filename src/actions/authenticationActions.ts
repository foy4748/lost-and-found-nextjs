"use server";
import { cookies } from "next/headers";

export type TUserAndUserProfilePayLoad = {
  name: string;
  email: string;
  password: string;
  profile: {
    bio: string;
    age: number;
  };
};

export const loginUser = async (email: string, password: string) => {
  const payload = { email, password };

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

export const registerUser = async (payload: TUserAndUserProfilePayLoad) => {
  const res = await fetch(`${process.env.SERVER_ADDRESS}/api/register`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  const result = await res.json();
  const token = res.headers.get("token");
  cookies().set("token", String(token));
  return { result, token: res.headers.get("token") };
};
