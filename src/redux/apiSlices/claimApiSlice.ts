import baseApi from "./baseApiSlice";

const TagClaims = "Claims";

// Define a service using a base URL and expected endpoints
export const claimApi = baseApi
  .enhanceEndpoints({ addTagTypes: [TagClaims] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getClaims: builder.query({
        query: (foundbyId: string) => {
          return {
            url: `/api/claims/${foundbyId}`,
          };
        },
        providesTags: [TagClaims],
      }),
      getClaimsByUser: builder.query({
        query: () => {
          return {
            url: `/api/claims/by-user`,
          };
        },
        providesTags: [TagClaims],
      }),
      postClaim: builder.mutation({
        query: (body) => {
          return {
            url: "/claims",
            method: "POST",
            body,
          };
        },
        invalidatesTags: [TagClaims],
      }),
      editClaim: builder.mutation({
        query: ({ claimId, body }) => {
          return {
            url: `/api/claims/${claimId}`,
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: [TagClaims],
      }),
    }),
  });

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetClaimsQuery,
  useGetClaimsByUserQuery,
  usePostClaimMutation,
  useEditClaimMutation,
} = claimApi;
