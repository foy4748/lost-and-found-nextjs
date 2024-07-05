import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";

export type TQueryProduct = {
  name: null | string;
  brand: null | string;
  modelNo: null | string;
  category: null | string;
  operatingSystem: null | string;
  connectivity: null | string;
  releaseDate: null | string;
  powerSource: null | string;
  storage: null | number;
  ram: null | number;
  camera: null | number;
  minPrice: null | number;
  maxPrice: null | number;
  isRestock?: boolean | false;
};

export type TKeyOfQueryProduct = keyof TQueryProduct;

const initialValue: TQueryProduct = {
  name: null,
  brand: null,
  modelNo: null,
  category: null,
  operatingSystem: null,
  connectivity: null,
  releaseDate: null,
  powerSource: null,
  storage: null,
  ram: null,
  camera: null,
  minPrice: 0,
  maxPrice: 100000000,
};

export const productQuerySlice = createSlice({
  name: "productQuery",
  initialState: initialValue,
  reducers: {
    setProductQuery: (_, action: PayloadAction<TQueryProduct>) => {
      return action.payload;
    },
    resetQuery: (state) => {
      state = initialValue;
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductQuery, resetQuery } = productQuerySlice.actions;

export default productQuerySlice.reducer;
