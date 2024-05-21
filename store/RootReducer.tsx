import { combineReducers } from "@reduxjs/toolkit";
import { LayoutReducer } from "./LayoutReducer";
import { NavigationReducer } from "./NavigationReducer";
import { UserReducer } from "./UserReducer";

const rootReducer = combineReducers({
  layout: LayoutReducer,
  navigation: NavigationReducer,
  user: UserReducer,
});

export default rootReducer;
