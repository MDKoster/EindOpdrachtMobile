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
  newArrivalItems: item[];
  mensFashionItems: item[];
  womensFashionItems: item[];
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
  newArrivalItems: [],
  mensFashionItems: [],
  womensFashionItems: [],
};

export const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    //om correct te zijn moet hier een tijdslimiet op staan, zodat de lijsten van items regelmatig worden opgevraagd, maar dat is niet nodig voor deze demo
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setPopularItems: (state, action) => {
      state.popularItems = action.payload;
    },
    setNewArrivalItems: (state, action) => {
      state.newArrivalItems = action.payload;
    },
    setMensFashionItems: (state, action) => {
      state.mensFashionItems = action.payload;
    },
    setWomensFashionItems: (state, action) => {
      state.womensFashionItems = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  setImages,
  setPopularItems,
  setNewArrivalItems,
  setMensFashionItems,
  setWomensFashionItems,
  toggleDarkMode,
} = LayoutSlice.actions;
export const LayoutReducer = LayoutSlice.reducer;
