import baseApi from "./baseApiSlice";
const TagSales = "Sales";

export type TCategorizeSaleQuery = {
  page?: number | `${number}` | 1;
  limit?: number | `${number}` | 10;
  year?: number | `${number}`;
  years?: string;
  month?: number | `${number}`;
  months?: string;
};

// Define a service using a base URL and expected endpoints
export const saleApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagSales, "Products"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSaleRecords: builder.query({
        query: () => {
          return {
            url: "/sales",
          };
        },
        providesTags: [TagSales],
      }),
      getCategorizedSaleRecords: builder.query({
        query: (q: TCategorizeSaleQuery) => {
          console.log(q);
          const params = new URLSearchParams();
          Object.keys(q).forEach((itm: string) => {
            params.append(itm, q[String(itm)] as string);
          });
          return {
            url: "/sales/categorized",
            params: params,
          };
        },
        providesTags: [TagSales],
      }),

      saleProduct: builder.mutation({
        query: (body) => {
          return {
            url: "/sales",
            method: "POST",
            body,
          };
        },
        invalidatesTags: [TagSales, "Products"],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSaleRecordsQuery,
  useGetCategorizedSaleRecordsQuery,
  useSaleProductMutation,
} = saleApi;
