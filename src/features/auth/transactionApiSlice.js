import { apiSlice } from "@/app/api/apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (serviceCode) => ({
        url: "/transaction",
        method: "POST",
        body: {
          service_code: serviceCode,
        },
      }),
    }),
  }),
});

export const { useCreateTransactionMutation } = transactionApiSlice;
