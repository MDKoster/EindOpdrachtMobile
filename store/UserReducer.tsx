import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartItem, item } from "../src/navigation/types";

type User = {
  id: string;
  userName: string;
  email: string;
};

const initialState: {
  currentUser: User | null;
  favorites: item[];
  shoppingCart: cartItem[];
} = {
  currentUser: null,
  favorites: [],
  shoppingCart: [],
};

// user bijhouden is onnodig na validatie, maar kan mss nodig zijn indien bijkomende data van user moet opgevraagd worden, bvb purchase history
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setFavorites: (state, action: PayloadAction<item[]>) => {
      state.favorites = action.payload;
    },
    addToShoppingCart: (state, action: PayloadAction<cartItem>) => {
      if (!state.shoppingCart) {
        state.shoppingCart = [];
      }

      const index = state.shoppingCart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.shoppingCart[index].quantity += 1;
      } else {
        state.shoppingCart.push(action.payload);
      }
    },
    removeFromShoppingCart: (state, action: PayloadAction<string>) => {
      const index = state.shoppingCart.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.shoppingCart[index].quantity -= 1;
        if (state.shoppingCart[index].quantity === 0) {
          state.shoppingCart = state.shoppingCart.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
    emptyShoppingCart: (state) => {
      state.shoppingCart = [];
    },
  },
});

export const {
  setUser,
  setFavorites,
  addToShoppingCart,
  removeFromShoppingCart,
  emptyShoppingCart,
} = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
