import { createSlice } from "@reduxjs/toolkit";

type image = {
  require: string;
};

const initialState: {
  images: image[];
  darkMode: boolean;
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
};

export const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setImages, toggleDarkMode } = ImageSlice.actions;
export const ImageReducer = ImageSlice.reducer;
