"use client";
import { loginUser } from "@/actions/authenticationActions";
import { useUserProfileQuery } from "@/redux/apiSlices/authApiSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import url from "url";
function LoginForm() {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const onFormSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const result = await loginUser(email, password);
    if (!result?.data || !result?.data?.token) {
      toast.error("Failed to login");
    } else {
      toast.success("Logged in!");
      window.localStorage.setItem("token", result?.data?.token);
      const { path } = url.parse(searchParams.get("callback") ?? "/");
      // console.log(searchParams.get("callback"));
      // console.log(path);
      setTimeout(() => {
        router.push(String(path));
        router.refresh();
      }, 1000);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-11/12 md:w-1/2 flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="example@example.com"
            {...register("email")}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            {...register("password")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default LoginForm;
