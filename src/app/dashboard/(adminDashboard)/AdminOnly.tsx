"use client";

import useAuthProtection from "@/hooks/useAuthProtection";

function AdminOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isUserAdmin, isTokenOK } = useAuthProtection();
  if (!isUserDeleted && isTokenOK && isUserAdmin) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default AdminOnly;
