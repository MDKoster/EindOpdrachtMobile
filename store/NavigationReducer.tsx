import { createSlice } from "@reduxjs/toolkit";

type image = {
  require: string;
};

const initialState: {
  tabBarHeight: number;
} = {
  tabBarHeight: 50,
};

export const NavigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTabBarHeight: (state, action) => {
      state.tabBarHeight = action.payload;
    },
  },
});

export const { setTabBarHeight } = NavigationSlice.actions;
export const NavigationReducer = NavigationSlice.reducer;

//this reducer is currently not used
