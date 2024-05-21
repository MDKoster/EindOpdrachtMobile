import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  userName: string;
  email: string;
};

const initialState: {
  user: User | null;
} = {
  user: null,
};

// user bijhouden is onnodig na validatie, maar kan mss nodig zijn indien bijkomende data van user moet opgevraagd worden, bvb purchase history
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
