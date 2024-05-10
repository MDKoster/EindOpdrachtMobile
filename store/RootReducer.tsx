import { combineReducers } from "@reduxjs/toolkit";
import { ImageReducer } from "./ImageReducer";
import { NavigationReducer } from "./NavigationReducer";

const rootReducer = combineReducers({
  image: ImageReducer,
  navigation: NavigationReducer,
});

export default rootReducer;
