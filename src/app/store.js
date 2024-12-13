import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";
import authReducer from "@/features/auth/authSlice";
import transactionReducer from "@/features/auth/transactionSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
