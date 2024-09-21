import { MyJWTPayLoad } from "@/_middleware";
import {
  logoutUser,
  startAuthLoading,
  stopAuthLoading,
} from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAuthProtection = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isAuthLoading } = auth;
  const [isTokenOK, setIsTokenOK] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    try {
      dispatch(startAuthLoading());
      const decoded: JwtPayload & MyJWTPayLoad = jwtDecode(String(auth?.token));
      const isTokenInvalid = Date.now() >= Number(decoded.exp) * 1000;
      setIsTokenOK(!isTokenInvalid);
      setIsUserDeleted(decoded.isDeleted);
      setIsUserAdmin(decoded?.isAdmin);
      if (isTokenInvalid) {
        toast("Please login first");
        dispatch(logoutUser());
        router.push(`/auth/login?callback=${window.location.href}`);
      }
      if (decoded.isDeleted) {
        toast.error("Your account has been deleted by an Admin");
        dispatch(logoutUser());
        router.push(`/auth/login?callback=${window.location.href}`);
      }
      if (
        !decoded?.isAdmin &&
        window.location.href.includes("/dashboard/admin")
      ) {
        toast.error("Admin Only Route");
        dispatch(logoutUser());
        router.push(`/auth/login?callback=${window.location.href}`);
      }
      dispatch(stopAuthLoading());
    } catch (error) {
      console.log(error);
      dispatch(logoutUser());
      toast("...Logging out...");
      router.push("/");
      dispatch(stopAuthLoading());
    }
  }, [auth?.token, dispatch, router]);

  return { isTokenOK, isUserDeleted, isUserAdmin, isAuthLoading };
};

export default useAuthProtection;
