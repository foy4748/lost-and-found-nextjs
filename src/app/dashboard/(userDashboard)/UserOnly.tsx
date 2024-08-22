"use client";

import useAuthProtection from "@/hooks/useAuthProtection";

function UserOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserDeleted, isTokenOK } = useAuthProtection();
  if (!isUserDeleted && isTokenOK) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default UserOnly;
