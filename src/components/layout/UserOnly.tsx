"use client";

import LoadingToast from "@/components/ui/LoadingToast";
import useAuthProtection from "@/hooks/useAuthProtection";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function UserOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isTokenOK, isAuthLoading } = useAuthProtection();
  const router = useRouter();

  if (isAuthLoading) {
    return (
      <>
        <LoadingToast isLoading={isAuthLoading} />
      </>
    );
  }

  if (!isUserDeleted && isTokenOK) {
    return <>{children}</>;
  } else {
    router.push("/");
    toast.error("Bad Credential Or, User has been deleted");
    return <></>;
  }
}

export default UserOnly;
