import { StackScreenProps } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

export type AuthStackParamsList = {
  Login: undefined;
  Register: undefined;
};

export type SearchStackParamsList = {
  SearchMain: undefined;
  SearchNew: undefined;
  SearchPopular: undefined;
  SearchClothing: undefined;
  SearchShoes: undefined;
  SearchAccessories: undefined;
  SearchSports: undefined;
};

export type SettingsStackParamsList = {
  AccountMain: undefined;
  LogIn: undefined;
  StoreLocator: undefined;
  AccountSettings: undefined;
  AboutGizmo: undefined;
  Sustainability: undefined;
  LatestNews: undefined;
  Help: undefined;
  AccountDelete: undefined;
  AboutApp: undefined;
  MapMarkerDetail: {
    store: {
      id: string;
      name: string;
      address: string;
      phone: string;
      image: ImageSourcePropType;
      openingHours: string[];
      latitude: number;
      longitude: number;
    };
  };
};

export type ShopStackParamsList = {
  HomeStack: undefined;
  ShopStack: { item: ImageSourcePropType };
};

export type ShopScreenProps<T extends keyof ShopStackParamsList> =
  StackScreenProps<ShopStackParamsList, T>;

export type SettingsScreenProps<T extends keyof SettingsStackParamsList> =
  StackScreenProps<SettingsStackParamsList, T>;

export type SearchScreenProps<T extends keyof SearchStackParamsList> =
  StackScreenProps<SearchStackParamsList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamsList> =
  StackScreenProps<AuthStackParamsList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends ShopStackParamsList,
        SettingsStackParamsList,
        SearchStackParamsList,
        AuthStackParamsList {}
  }
}
