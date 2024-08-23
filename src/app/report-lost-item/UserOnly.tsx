"use client";

import LoadingToast from "@/components/ui/LoadingToast";
import useAuthProtection from "@/hooks/useAuthProtection";

function UserOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isTokenOK, isAuthLoading } = useAuthProtection();

  if (isAuthLoading) {
    return (
      <>
        <LoadingToast isLoading={isAuthLoading} />
      </>
    );
  }

  if (!isUserDeleted && isTokenOK) {
    return <>{children}</>;
  }
}

export default UserOnly;
