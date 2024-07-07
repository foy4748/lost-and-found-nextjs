import { TUserUpdatePayload } from "@/components/profile/EditProfile";
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

export type TUserPasswordChangePayload = {
  currentPassword: string;
  newPassword: string;
};
const TagUserProfile = "UserProfile";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagUserProfile] })
  .injectEndpoints({
    endpoints: (builder) => ({
      userProfile: builder.query({
        query: () => {
          return {
            url: "/api/user",
            method: "GET",
          };
        },
        providesTags: [TagUserProfile],
      }),
      updateUserProfile: builder.mutation({
        query: <T>(body: T) => {
          console.log(body);
          return {
            url: "/api/my-profile",
            method: "PATCH",
            body,
          };
        },
        invalidatesTags: [TagUserProfile],
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
      changePassword: builder.mutation({
        query: (payload: TUserPasswordChangePayload) => {
          return {
            url: "/api/change-password",
            method: "PATCH",
            body: payload,
          };
        },
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useChangePasswordMutation,
} = authApi;
