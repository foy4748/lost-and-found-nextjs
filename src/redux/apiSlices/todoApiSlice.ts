import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TSingleTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TTodo = TSingleTodo[];

type TQueryType = number | null;

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getToDo: builder.query<TTodo, TQueryType>({
      query: (limit: TQueryType) => (limit ? `?_limit=${limit}` : "/"),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetToDoQuery } = todoApi;
