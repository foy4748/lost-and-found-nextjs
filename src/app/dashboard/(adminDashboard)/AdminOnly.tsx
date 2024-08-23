"use client";

import useAuthProtection from "@/hooks/useAuthProtection";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isUserAdmin, isTokenOK } = useAuthProtection();
  const router = useRouter();
  useEffect(() => {
    if (!(!isUserDeleted && isTokenOK && isUserAdmin)) {
      router.push(`/auth/login?callback=${window.location.href}`);
    }
  }, [isUserDeleted, isUserAdmin, isTokenOK, router]);

  if (!isUserDeleted && isTokenOK && isUserAdmin) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default AdminOnly;
