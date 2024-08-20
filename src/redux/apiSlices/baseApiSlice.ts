import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logoutUser } from "../slices/authSlice";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", token);
    }

    headers.set(
      "Access-Control-Allow-Origin",
      "https://apollo-assignment-09.vercel.app"
    );
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    api.dispatch(logoutUser());
    toast.error("Unauthenticated State. Please Login");
    window.location.href = "/auth/login";
    return result;
  }

  return result;
};
// Define a service using a base URL and expected endpoints
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default baseApi;
