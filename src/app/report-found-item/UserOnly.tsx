"use client";

import useAuthProtection from "@/hooks/useAuthProtection";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isTokenOK } = useAuthProtection();
  const router = useRouter();
  useEffect(() => {
    if (!(!isUserDeleted && isTokenOK)) {
      router.push(`/auth/login?callback=${window.location.href}`);
    }
  }, [isUserDeleted, isTokenOK, router]);
  if (!isUserDeleted && isTokenOK) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default UserOnly;
