"use client";

import LoadingToast from "@/components/ui/LoadingToast";
import useAuthProtection from "@/hooks/useAuthProtection";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AdminOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isUserAdmin, isTokenOK, isAuthLoading } =
    useAuthProtection();
  const router = useRouter();

  if (isAuthLoading) {
    return (
      <>
        <LoadingToast isLoading={isAuthLoading} />
      </>
    );
  }

  if (!isUserAdmin) {
    router.push(`/auth/login?callback=${window.location.href}`);
    return <></>;
  }

  if (!isUserDeleted && isTokenOK && isUserAdmin) {
    return <>{children}</>;
  }
}

export default AdminOnly;
