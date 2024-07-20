"use client";
import {
  registerUser,
  TUserAndUserProfilePayLoad,
} from "@/actions/authenticationActions";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import url from "url";

export type TRegisterInputType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  age: number;
};

function RegisterForm() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<TRegisterInputType>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: TRegisterInputType) => {
    const { name, email, password, confirmPassword, bio, age } = data;
    const profile = { bio, age: Number(age) };
    if (password != confirmPassword) {
      setError("password", { type: "value", message: "Password mismatched" });
      setError("confirmPassword", {
        type: "value",
        message: "Password mismatched",
      });
      toast.error("Confirmation password did not matched");
      console.log(errors);
      return;
    }

    const payload = { name, email, password, profile };
    try {
      const { token } = await registerUser(payload);
      if (token) {
        window.localStorage.setItem("token", String(token));
        const { path } = url.parse(searchParams.get("callback") ?? "/");
        // console.log(searchParams.get("callback"));
        // console.log(path);
        setTimeout(() => {
          router.push(String(path));
          router.refresh();
        }, 1000);
      } else {
        toast.error("Failed to Register");
      }
    } catch (e) {
      toast.error("Failed to Register");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-11/12 md:w-1/2 flex-col gap-4"
      >
        <h1 className="form-title mt-10">Register</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Your Name" />
          </div>
          <TextInput
            {...register("name")}
            id="name1"
            type="text"
            name="name"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            {...register("email")}
            id="email1"
            type="email"
            name="email"
            placeholder="example@example.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            {...register("password")}
            name="password"
            id="password1"
            type="password"
            min={8}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword" value="Confirm password" />
          </div>
          <TextInput
            {...register("confirmPassword")}
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            min={8}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bio1" value="Bio" />
          </div>
          <TextInput
            {...register("bio", { required: true })}
            name="bio"
            id="bio1"
            type="text"
            placeholder="I like Coffee ☕"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="age1" value="Age" />
          </div>
          <TextInput
            {...register("age")}
            name="age"
            id="age1"
            type="number"
            required
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

export default RegisterForm;
