import { IAuthState } from "../slices/authSlice";
import baseApi from "./baseApiSlice";

export type TUserRegistractionCredentials = {
  email: string;
  username: string;
  password: string;
  role?: "user" | "admin";
};

export type TUserCredentials = {
  username: string;
  password: string;
};

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => {
        return {
          url: "/api/user",
          method: "GET",
        };
      },
    }),
    authRegister: builder.mutation({
      query: (userCredentials: TUserRegistractionCredentials) => {
        console.log(userCredentials);
        return {
          url: "/api/register",
          method: "POST",
          body: userCredentials,
        };
      },
    }),
    authLogin: builder.mutation({
      query: (userCredentials: TUserCredentials) => {
        return {
          url: "/api/login",
          method: "POST",
          body: userCredentials,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUserProfileQuery,
  useAuthLoginMutation,
  useAuthRegisterMutation,
} = authApi;
