"use client";
import { useState } from "react";
import { uploadPhoto } from "@/actions/uploadPhoto";
import LoadingToast from "@/components/ui/LoadingToast";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/useRedux";
import {
  authenticateUser,
  startAuthLoading,
  stopAuthLoading,
} from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import url from "url";
import { useRegisterUserMutation } from "@/redux/apiSlices/authApiSlice";

export type TRegisterInputType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  age: number;
  photoFile?: string;
};

function RegisterForm() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<TRegisterInputType>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data: TRegisterInputType) => {
    const { name, email, password, confirmPassword, bio, age } = data;
    let photoUrl: string | undefined;

    setLoading(true);
    dispatch(startAuthLoading());
    if (data["photoFile"]?.length && data["photoFile"][0]) {
      // Uploading Photo to IMG BB ------------
      const photoFile = new FormData();
      const file = data["photoFile"][0];
      photoFile.append("image", file);

      try {
        const resultUrl = await uploadPhoto(photoFile);
        //data["profile"]["photoUrl"] = String(resultUrl);
        photoUrl = resultUrl;

        //------ ---------- ----------- ----------
      } catch (error) {
        console.error(error);
        toast.error("Couldn't Upload Product Photo");
      }
    }
    const profile = { bio, age: Number(age), photoUrl };
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
      const { data } = await registerUser(payload);
      const { token } = data.data;
      if (token) {
        dispatch(
          authenticateUser({
            user: data.data,
            token,
            photoUrl: data.data.profile.photoUrl,
          })
        );
        window.localStorage.setItem("token", String(token));
        const { path } = url.parse(searchParams.get("callback") ?? "/");
        setTimeout(() => {
          router.push(String(path));
          router.refresh();
        }, 1000);
      } else {
        dispatch(stopAuthLoading());
        toast.error("Failed to Register || Invalid Token");
      }
    } catch (e) {
      console.log(e);
      dispatch(stopAuthLoading());
      toast.error("Failed to Register");
    }
    setLoading(false);
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="file-upload" value="Upload Photo" />
          </div>
          <FileInput id="file-upload" {...register("photoFile")} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <LoadingToast isLoading={loading} />
    </>
  );
}

export default RegisterForm;
