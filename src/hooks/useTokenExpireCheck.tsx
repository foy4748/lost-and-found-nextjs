import { MyJWTPayLoad } from "@/middleware";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useTokenExpireCheck = (token: string) => {
  const [validity, setValidity] = useState(false);
  useEffect(() => {
    try {
      const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(token));
      // Logics
      const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;
      console.log("expired", isTokenInvalid);
      setValidity(!isTokenInvalid);
    } catch (error) {
      setValidity(false);
    }
  }, [token]);
  return [validity, setValidity];
};

export default useTokenExpireCheck;
