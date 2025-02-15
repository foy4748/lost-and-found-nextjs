"use client";

import { useSession } from "next-auth/react";

export default function TestComponent() {
  const { data: session } = useSession();
  return <>{JSON.stringify(session)}</>;
}
