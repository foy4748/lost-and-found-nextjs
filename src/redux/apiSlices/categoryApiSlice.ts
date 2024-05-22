import baseApi from "./baseApiSlice";

const TagCategories = "Categories";

// Define a service using a base URL and expected endpoints
export const categoryApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagCategories] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategory: builder.query({
        query: () => {
          return {
            url: "/api/found-item-categories",
            method: "GET",
          };
        },
        providesTags: [TagCategories],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoryQuery } = categoryApi;
