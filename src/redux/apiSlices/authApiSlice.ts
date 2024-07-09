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
const TagAllUsers = "AllUsers";

// Define a service using a base URL and expected endpoints
export const authApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagUserProfile, TagAllUsers] })
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
      allUsers: builder.query({
        query: () => {
          return {
            url: "/api/users/all",
            method: "GET",
          };
        },
        providesTags: [TagAllUsers],
      }),
      deleteUser: builder.mutation({
        query: ({
          isDeleted,
          userId,
        }: {
          isDeleted: boolean;
          userId: string;
        }) => {
          return {
            url: `/api/delete-user/${userId}`,
            method: "PATCH",
            body: {
              isDeleted,
            },
          };
        },
        invalidatesTags: [TagAllUsers],
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
  useAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserProfileMutation,
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useChangePasswordMutation,
} = authApi;
