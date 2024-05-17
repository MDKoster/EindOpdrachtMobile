import { createSlice } from "@reduxjs/toolkit";
import { StoreLocationType } from "../src/navigation/types";

const initialState: {
  tabBarHeight: number;
  storeLocations: StoreLocationType[];
} = {
  tabBarHeight: 50,
  storeLocations: [],
};

export const NavigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTabBarHeight: (state, action) => {
      state.tabBarHeight = action.payload;
    },
    setStoreLocations: (state, action) => {
      state.storeLocations = action.payload;
    },
  },
});

export const { setTabBarHeight, setStoreLocations } = NavigationSlice.actions;
export const NavigationReducer = NavigationSlice.reducer;
