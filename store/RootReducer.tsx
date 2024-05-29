import { combineReducers } from "@reduxjs/toolkit";
import { LayoutReducer } from "./LayoutReducer";
import { NavigationReducer } from "./NavigationReducer";
import { UserReducer } from "./UserReducer";
import { ShopReducer } from "./ShopReducer";

const rootReducer = combineReducers({
  layout: LayoutReducer,
  navigation: NavigationReducer,
  user: UserReducer,
  shop: ShopReducer,
});

export default rootReducer;
