"use client";

import LoadingToast from "@/components/ui/LoadingToast";
import useAuthProtection from "@/hooks/useAuthProtection";
import { logoutUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function AdminOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isUserAdmin, isTokenOK, isAuthLoading } =
    useAuthProtection();
  const router = useRouter();
  const dispatch = useDispatch();

  if (isAuthLoading) {
    return (
      <>
        <LoadingToast isLoading={isAuthLoading} />
      </>
    );
  }

  if (!isUserAdmin) {
    toast.error("Admin Only Route");
    dispatch(logoutUser());
    router.push(`/auth/login?callback=${window.location.href}`);
    return <></>;
  }

  if (!isUserDeleted && isTokenOK && isUserAdmin) {
    return <>{children}</>;
  }
}

export default AdminOnly;
