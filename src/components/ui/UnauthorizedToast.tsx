"use client";

import { useLogoutUserMutation } from "@/redux/apiSlices/authApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

function UnauthorizedToast({
  isNotAdmin,
  isDeleted,
}: {
  isNotAdmin: boolean;
  isDeleted: boolean;
}) {
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  useEffect(() => {
    if (isNotAdmin) {
      toast.error("Unauthorized attempt");
    }
    if (isDeleted) {
      toast.error("User was deleted");
    }
    if (isNotAdmin || isDeleted) {
      logoutUser(null);
    }
  }, [isNotAdmin, isDeleted, logoutUser]);
  return (
    <>
      Unauthorized access || <Link href="/">Go Home</Link>
    </>
  );
}

export default UnauthorizedToast;
