import { createSlice } from "@reduxjs/toolkit";
import { item } from "../src/navigation/types";

type image = {
  require: string;
};

//images can be removed here, but I left them in for use with the splashscreen component
const initialState: {
  images: image[];
  darkMode: boolean;
  popularItems: item[];
} = {
  images: [
    require("../assets/images/splash2.jpg"),
    require("../assets/images/splash3.jpg"),
    require("../assets/images/splash4.jpg"),
    require("../assets/images/splash5.jpg"),
    require("../assets/images/splash6.jpg"),
    require("../assets/images/splash7.jpg"),
    require("../assets/images/splash8.jpg"),
  ],
  darkMode: false,
  popularItems: [],
};

export const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setPopularItems: (state, action) => {
      state.popularItems = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setImages, setPopularItems, toggleDarkMode } =
  LayoutSlice.actions;
export const LayoutReducer = LayoutSlice.reducer;
