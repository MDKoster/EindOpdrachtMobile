import { createSlice } from "@reduxjs/toolkit";

type image = {
  require: string;
};

const initialState: {
  tabBarHeight: number;
  storeLocations: Array<{
    id: string;
    name: string;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
  }>;
} = {
  tabBarHeight: 50,
  storeLocations: [
    {
      id: "1",
      name: "Gizmo Oostakker",
      address: "Wildebrake 74, 9041 Oostakker",
      phone: "09 251 60 16",
      latitude: 51.0813,
      longitude: 3.7831,
    },
    {
      id: "2",
      name: "Gizmo Mariakerke",
      address: "Beukelaarstraat 2, 9030 Mariakerke",
      phone: "09 233 55 10",
      latitude: 51.0613,
      longitude: 3.7031,
    },
    {
      id: "3",
      name: "Gizmo Melle",
      address: "Gontrode Heirweg 192, 9090 Melle",
      phone: "09 252 20 43",
      latitude: 51.0013,
      longitude: 3.7831,
    },
  ],
};

export const NavigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTabBarHeight: (state, action) => {
      state.tabBarHeight = action.payload;
    },
    setStoreLocations: (state, action) => {
      state.storeLocations = action.payload;
    },
  },
});

export const { setTabBarHeight } = NavigationSlice.actions;
export const NavigationReducer = NavigationSlice.reducer;

//this reducer is currently not used
