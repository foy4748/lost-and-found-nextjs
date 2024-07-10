import baseApi from "./baseApiSlice";

type TQueryReportFoundItem = {
  foundItemName?: string;
  searchTerm?: string;
  limit?: number;
  page?: number;
  sortOrder?: "asc" | "desc";
  sortBy?: "foundItemName" | "category" | "foundDate";
  userId?: string;
  isItemFound?: number | `${number}`;
};

const TagReportFoundItems = "ReportFoundItems";
const TagReportFoundItemsByUser = "ReportFoundItemsByUser";
const TagReportFoundItemAnalytics = "ReportFoundItemAnalytics";

// Define a service using a base URL and expected endpoints
export const foundItemApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      TagReportFoundItems,
      TagReportFoundItemsByUser,
      TagReportFoundItemAnalytics,
    ],
  })
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
            url: `/api/found-items/${id}`,
          };
        },
      }),
      getFoundItemByUser: builder.query({
        query: (isItemFound: unknown) => {
          let queryParams = null;

          if (isItemFound) {
            queryParams = new URLSearchParams(
              isItemFound as URLSearchParams
            ).toString();
          }
          console.log("test", queryParams);
          return {
            url: queryParams
              ? `/api/found-items/by-user?${queryParams}`
              : "/api/found-items/by-user",
            method: "GET",
          };
        },
        providesTags: [TagReportFoundItemsByUser],
      }),
      postReportFoundItem: builder.mutation({
        query: (body) => {
          console.log("report found payload", body);
          return {
            url: "/api/found-items/report-found",
            method: "POST",
            body,
          };
        },
        invalidatesTags: [TagReportFoundItems],
      }),
      postReportLostItem: builder.mutation({
        query: (body) => {
          return {
            url: "/api/found-items/report-lost",
            method: "POST",
            body,
          };
        },
        invalidatesTags: [TagReportFoundItems],
      }),
      editReportFoundItem: builder.mutation({
        query: (body) => {
          return {
            url: "/api/found-items",
            method: "PATCH",
            body,
          };
        },
        invalidatesTags: [TagReportFoundItemsByUser, TagReportFoundItems],
      }),
      deleteReportFoundItem: builder.mutation({
        query: (foundItemId: string) => {
          return {
            url: `/api/found-items/${foundItemId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [TagReportFoundItemsByUser, TagReportFoundItems],
      }),
      getFoundItemsAnalytics: builder.query({
        query: () => {
          return {
            url: "/api/found-items/analytics",
            method: "GET",
          };
        },
        providesTags: [TagReportFoundItemAnalytics],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetReportFoundItemQuery,
  useGetSingleReportFoundItemQuery,
  usePostReportFoundItemMutation,
  usePostReportLostItemMutation,
  useEditReportFoundItemMutation,
  useDeleteReportFoundItemMutation,
  useGetFoundItemByUserQuery,
  useGetFoundItemsAnalyticsQuery,
} = foundItemApi;
