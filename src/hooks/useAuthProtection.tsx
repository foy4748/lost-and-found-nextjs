import { MyJWTPayLoad } from "@/_middleware";
import { startAuthLoading, stopAuthLoading } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthProtection = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isAuthLoading } = auth;
  const [isTokenOK, setIsTokenOK] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  console.log("HIT 1", isUserDeleted, isTokenOK);
  useEffect(() => {
    try {
      dispatch(startAuthLoading());
      const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(auth?.token));
      const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;
      setIsTokenOK(!isTokenInvalid);
      setIsUserDeleted(decoded.isDeleted);
      setIsUserAdmin(decoded?.isAdmin);
      dispatch(stopAuthLoading());
    } catch (error) {
      console.log(error);

      router.push(`/auth/login?callback=${window.location.href}`);
      dispatch(stopAuthLoading());
    }
  }, []);

  return { isTokenOK, isUserDeleted, isUserAdmin, isAuthLoading };
};

export default useAuthProtection;
