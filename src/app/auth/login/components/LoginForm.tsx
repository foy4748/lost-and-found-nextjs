"use client";
// import UnauthorizedToast from "@/components/ui/UnauthorizedToast";
// import { useAppDispatch } from "@/redux/useRedux";
import { Button, Label, TextInput } from "flowbite-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import { useLoginUserMutation } from "@/redux/apiSlices/authApiSlice";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useTokenExpireCheck from "@/hooks/useTokenExpireCheck";
import CenterItem from "@/components/ui/CenterItem";

function LoginForm() {
  // const dispatch = useAppDispatch();
  const [isWrongInput, setIsWrongInput] = useState(false);
  const [validity] = useTokenExpireCheck();
  const session = useSession();
  const pathname = usePathname();
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  //const auth = useAppSelector((state) => state.auth);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(session.status);

  useEffect(() => {
    if (session.status == "authenticated") {
      if (validity) {
        let callbackUrl = pathname.includes("login") ? "/" : pathname;
        callbackUrl = searchParams.get("callbackUrl") || callbackUrl;
        console.log("LOGIN PAGE", callbackUrl);
        toast.success("Redirecting...");
        router.push(String(callbackUrl));
        router.refresh();
      }
      // redirect(String(path));
    }
    // if (session.status == "loading") {
    //   toast.success("Checking Status");
    // }
  }, [session.status, router, searchParams, pathname, validity]);

  const onFormSubmit = async (data: { email: string; password: string }) => {
    setIsWrongInput(false);
    setAuthLoading(true);
    const { email, password } = data;
    try {
      await loginUser({ email, password });
      const nextAuthResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (nextAuthResponse?.ok) {
        toast.success("Logged in!");
        let callbackUrl = pathname.includes("login") ? "/" : pathname;
        callbackUrl = searchParams.get("callbackUrl") || callbackUrl;
        console.log("LOGIN PAGE", callbackUrl);
        // router.push("/");
        setAuthLoading(false);
        router.push(callbackUrl);
      } else {
        toast.error("Wrong Credentials / Invalid Email-Password");
        setIsWrongInput(true);
        setAuthLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setIsWrongInput(true);
      setAuthLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex w-11/12 md:w-1/2 flex-col gap-4"
      >
        <h1 className="form-title mt-10">Login</h1>
        {(isLoading || session.status == "loading" || authLoading) && (
          <CenterItem>
            <LoaderIcon />
          </CenterItem>
        )}
        {/*
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
        </p> */}
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
        <div
          className={`flex items-center gap-2 ${isWrongInput ? "" : "hidden"}`}
        >
          <p className="text-red-500">
            Wrong Credentials / Invalid Email-Password
          </p>
        </div>
        <Button disabled={authLoading || isLoading} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
