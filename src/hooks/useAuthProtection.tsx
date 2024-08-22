import { MyJWTPayLoad } from "@/_middleware";
import { useAppSelector } from "@/redux/useRedux";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthProtection = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const [isTokenOK, setIsTokenOK] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  useEffect(() => {
    try {
      const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(auth?.token));
      const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;
      setIsTokenOK(!isTokenInvalid);
      setIsUserDeleted(decoded.isDeleted);
      setIsUserAdmin(decoded?.isAdmin);
    } catch (error) {
      console.log(error);
      router.push(`/auth/login?callback=${window.location.href}`);
    }
  }, [auth.token, router]);

  return { isTokenOK, isUserDeleted, isUserAdmin };
};

export default useAuthProtection;
