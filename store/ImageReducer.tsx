import { createSlice } from "@reduxjs/toolkit";

type image = {
  require: string;
};

const initialState: {
  images: image[];
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
};

export const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setImages } = ImageSlice.actions;
export const ImageReducer = ImageSlice.reducer;
