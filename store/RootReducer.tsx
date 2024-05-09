import { combineReducers } from "@reduxjs/toolkit";
import { ImageReducer } from "./ImageReducer";

const rootReducer = combineReducers({
  image: ImageReducer,
});

export default rootReducer;
