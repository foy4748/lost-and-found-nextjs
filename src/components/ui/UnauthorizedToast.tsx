"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

function UnauthorizedToast({ isNotAdmin }: { isNotAdmin: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (isNotAdmin) {
      toast.error("Unauthorized attempt");
    }
  }, [isNotAdmin]);
  return (
    <>
      Unauthorized access ||{" "}
      <span className="cursor-pointer" onClick={() => router.back()}>
        Go Back
      </span>
    </>
  );
}

export default UnauthorizedToast;
