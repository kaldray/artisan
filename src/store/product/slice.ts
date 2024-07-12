import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../products/type";

const initialState = {
  _id: "",
  name: "",
  type: "phone",
  price: 0,
  rating: 0,
  warranty_years: 0,
  available: true,
} satisfies Product as Product;

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Partial<Product>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset: () => {
      return { ...initialState };
    },
  },
});

export const { setProduct, reset } = ProductSlice.actions;
export default ProductSlice.reducer;
