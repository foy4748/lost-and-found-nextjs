"use client";
import {
  registerUser,
  TUserAndUserProfilePayLoad,
} from "@/actions/authenticationActions";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

export type TRegisterInputType = {
  name: string;
  email: string;
  password: string;
  bio: string;
  age: number;
};

function RegisterForm() {
  const { handleSubmit, register } = useForm<TRegisterInputType>();

  const onSubmit = async (data: TRegisterInputType) => {
    const { name, email, password, bio, age } = data;
    const profile = { bio, age: Number(age) };

    const payload = { name, email, password, profile };
    const { token } = await registerUser(payload);
    window.localStorage.setItem("token", String(token));
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-11/12 md:w-1/2 flex-col gap-4"
      >
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
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bio1" value="Bio" />
          </div>
          <TextInput
            {...register("bio")}
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
