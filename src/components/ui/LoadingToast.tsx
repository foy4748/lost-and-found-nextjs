"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

function LoadingToast({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    if (isLoading) {
      toast("Loading...", { icon: "⏳" });
    }
  }, [isLoading]);
  return <></>;
}

export default LoadingToast;
