import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { POST_Response, Product, Products } from "./type";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Products, void>({
      transformResponse: (response: { data: Products }) => response.data,
      query: () => `products`,
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, string>({
      transformResponse: (response: { data: Product }) => response.data,
      query: (id: string) => `products/${id}`,
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: ({ _id, ...params }) => ({
        url: `products/${_id}`,
        method: "PUT",
        body: params,
        headers: {
          accecpt: "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<unknown, Pick<Product, "_id">>({
      query: ({ _id }) => ({
        url: `products/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addProduct: builder.mutation<POST_Response, Omit<Product, "_id">>({
      query: (body) => ({
        url: `products/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});
