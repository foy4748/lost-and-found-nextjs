import { filterQueryObjectForProductApiSlice } from "@/utilities/utilities";
import { TQueryProduct } from "../slices/productQuerySlice";
import baseApi from "./baseApiSlice";

const TagProducts = "Products";

// Define a service using a base URL and expected endpoints
export const productApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagProducts] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProduct: builder.query({
        query: (productQuery: TQueryProduct | null) => {
          let queryParams = null;
          if (productQuery) {
            const updated = filterQueryObjectForProductApiSlice<
              TQueryProduct | Record<string, string>
            >(productQuery);

            queryParams = new URLSearchParams(
              updated as Record<string, string>
            );
          }
          return {
            url: productQuery ? `/products?${queryParams}` : "/products",
            method: "GET",
          };
        },
        providesTags: [TagProducts],
      }),
      getSingleProduct: builder.query({
        query: (id: string) => {
          return {
            url: `/products/${id}`,
          };
        },
      }),
      postProduct: builder.mutation({
        query: (body) => {
          return {
            url: "/products",
            method: "POST",
            body,
          };
        },
        invalidatesTags: [TagProducts],
      }),
      editProduct: builder.mutation({
        query: (body) => {
          return {
            url: "/products",
            method: "PUT",
            body,
          };
        },
        invalidatesTags: [TagProducts],
      }),
      deleteProduct: builder.mutation({
        query: (body) => {
          console.log(body);
          return {
            url: "/products",
            method: "DELETE",
            body,
          };
        },
        invalidatesTags: [TagProducts],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductQuery,
  useGetSingleProductQuery,
  usePostProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;
