"use client";
import UnauthorizedToast from "@/components/ui/UnauthorizedToast";
import { useAppDispatch } from "@/redux/useRedux";
import {
  authenticateUser,
  startAuthLoading,
  stopAuthLoading,
} from "@/redux/slices/authSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import url from "url";
import { useLoginUserMutation } from "@/redux/apiSlices/authApiSlice";

function LoginForm() {
  const dispatch = useAppDispatch();
  //const auth = useAppSelector((state) => state.auth);
  const [loginUser] = useLoginUserMutation();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const onFormSubmit = async (data: { email: string; password: string }) => {
    dispatch(startAuthLoading());
    const { email, password } = data;
    try {
      const { data: result } = await loginUser({ email, password });
      console.log(result);
      if (!result?.data || !result?.data?.token) {
        toast.error("Failed to login");
      } else {
        toast.success("Logged in!");
        console.log(result);
        dispatch(
          authenticateUser({
            user: result.data,
            token: result.data.token,
            photoUrl: result.data.profile.photoUrl,
          })
        );
        window.localStorage.setItem("token", result?.data?.token);
        const { path } = url.parse(searchParams.get("callback") ?? "/");
        // console.log(searchParams.get("callback"));
        // console.log(path);
        dispatch(stopAuthLoading());
        setTimeout(() => {
          router.push(String(path));
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      dispatch(stopAuthLoading());
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-11/12 md:w-1/2 flex-col gap-4"
      >
        <h1 className="form-title mt-10">Login</h1>
        <p className="text-red-500">
          {searchParams.get("isAdmin") === "0" ||
          searchParams.get("isDeleted") === "1" ? (
            <UnauthorizedToast
              isNotAdmin={searchParams.get("isAdmin") === "0"}
              isDeleted={searchParams.get("isDeleted") === "1"}
            />
          ) : (
            ""
          )}
        </p>
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
