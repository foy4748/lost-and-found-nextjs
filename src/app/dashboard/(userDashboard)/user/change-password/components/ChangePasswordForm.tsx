"use client";
import {
  TUserPasswordChangePayload,
  useChangePasswordMutation,
} from "@/redux/apiSlices/authApiSlice";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import LoadingToast from "@/components/ui/LoadingToast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function ChangePasswordForm() {
  const router = useRouter();
  const { handleSubmit, register, reset } =
    useForm<TUserPasswordChangePayload>();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handlePasswordChange = async (data: TUserPasswordChangePayload) => {
    try {
      const response = await changePassword(data);
      if (response?.data) {
        toast.success("Password changed successfully");
        reset();
        router.back();
      } else {
        toast.error("Password change failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Password change failed");
    }
  };
  return (
    <>
      <LoadingToast isLoading={isLoading} />
      <form
        onSubmit={handleSubmit(handlePasswordChange)}
        className="flex max-w-md flex-col gap-4"
      >
        <h1 className="form-title mb-4">Update Password</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="oldpassword" value="Old Password" />
          </div>
          <TextInput
            {...register("currentPassword")}
            id="oldpassword"
            type="password"
            sizing="md"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="newpassword" value="New Password" />
          </div>
          <TextInput
            {...register("newPassword")}
            id="newpassword"
            type="password"
            sizing="md"
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default ChangePasswordForm;
