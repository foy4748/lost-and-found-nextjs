"use client";
import { MyJWTPayLoad } from "@/middleware";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useTokenExpireCheck = () => {
  const [validity, setValidity] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    try {
      const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(
        String(session?.user?.token)
      );
      // Logics
      const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;
      setValidity(!isTokenInvalid);
    } catch (error) {
      console.log("useTokenExpireCheck", error);
      setValidity(false);
    }
  }, [session?.user?.token]);
  return [validity, setValidity];
};

export default useTokenExpireCheck;
