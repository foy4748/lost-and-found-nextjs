import { MyJWTPayLoad } from "@/middleware";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useTokenExpireCheck = () => {
  const [validity, setValidity] = useState(false);
  console.log("useTokenExpireCheck", validity);
  const session = useSession();
  useEffect(() => {
    try {
      if (session.status == "authenticated") {
        const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(
          String(session?.data?.user?.token),
        );
        // Logics
        const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;
        setValidity(!isTokenInvalid);
      } else {
        setValidity(false);
      }
    } catch (error) {
      console.log("useTokenExpireCheck", error);
      setValidity(false);
    }
  }, [session?.status, session?.data?.user?.token]);
  return [validity, setValidity];
};

export default useTokenExpireCheck;
