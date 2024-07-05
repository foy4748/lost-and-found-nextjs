"use client";
import { loginUser } from "@/actions/authenticationActions";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value as string;
    const password = e.target.password.value as string;
    const result = await loginUser(email, password);
    if (!result?.data || !result?.data?.token) {
      toast.error("Failed to login");
    } else {
      toast.success("Logged in!");
      window.localStorage.setItem("token", result?.data?.token);
      if (String(pathname).includes("auth")) router.push("/");
      else router.refresh();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-11/12 md:w-1/2 flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
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
          <TextInput name="password" id="password1" type="password" required />
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
