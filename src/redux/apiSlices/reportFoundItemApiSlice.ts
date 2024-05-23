import baseApi from "./baseApiSlice";

type TQueryReportFoundItem = {
  foundItemName?: string;
  searchTerm?: string;
  limit?: number;
  page?: number;
  sortOrder?: "asc" | "desc";
  sortBy?: "foundItemName" | "category" | "foundDate";
};

const TagReportFoundItems = "ReportFoundItems";

// Define a service using a base URL and expected endpoints
export const foundItemApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagReportFoundItems] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getReportFoundItem: builder.query({
        query: (foundItemQuery: TQueryReportFoundItem | null) => {
          console.log(foundItemQuery);
          let queryParams = null;

          if (foundItemQuery) {
            queryParams = new URLSearchParams(
              foundItemQuery as URLSearchParams
            ).toString();
          }
          console.log("test", queryParams);

          return {
            url: foundItemQuery
              ? `/api/found-items?${queryParams}`
              : "/api/found-items",
            method: "GET",
          };
        },
        providesTags: [TagReportFoundItems],
      }),
      getSingleReportFoundItem: builder.query({
        query: (id: string) => {
          return {
            url: `/foundItems/${id}`,
          };
        },
      }),
      postReportFoundItem: builder.mutation({
        query: (body) => {
          return {
            url: "/api/found-items",
            method: "POST",
            body,
          };
        },
        invalidatesTags: [TagReportFoundItems],
      }),
      editReportFoundItem: builder.mutation({
        query: (body) => {
          return {
            url: "/foundItems",
            method: "PUT",
            body,
          };
        },
        invalidatesTags: [TagReportFoundItems],
      }),
      deleteReportFoundItem: builder.mutation({
        query: (body) => {
          console.log(body);
          return {
            url: "/foundItems",
            method: "DELETE",
            body,
          };
        },
        invalidatesTags: [TagReportFoundItems],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetReportFoundItemQuery,
  useGetSingleReportFoundItemQuery,
  usePostReportFoundItemMutation,
  useEditReportFoundItemMutation,
  useDeleteReportFoundItemMutation,
} = foundItemApi;
