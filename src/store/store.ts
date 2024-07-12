import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import { productApi } from "./products/services";

import deleteModalSlice from "./modal/slice.js";
import productSlice from "./product/slice.js";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    deleteModalSlice,
    productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
