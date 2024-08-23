"use client";

import LoadingToast from "@/components/ui/LoadingToast";
import useAuthProtection from "@/hooks/useAuthProtection";

function AdminOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isUserAdmin, isTokenOK, isAuthLoading } =
    useAuthProtection();

  if (isAuthLoading) {
    return (
      <>
        <LoadingToast isLoading={isAuthLoading} />
      </>
    );
  }

  if (!isUserDeleted && isTokenOK && isUserAdmin) {
    return <>{children}</>;
  }
}

export default AdminOnly;
