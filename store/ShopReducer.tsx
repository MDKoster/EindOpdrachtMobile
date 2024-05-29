import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  filterOptions: string[];
} = {
  filterOptions: [],
};

export const ShopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
  },
});

export const { setFilterOptions } = ShopSlice.actions;
export const ShopReducer = ShopSlice.reducer;
