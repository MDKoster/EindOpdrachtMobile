import { NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

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
  UserDetail: undefined;
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
    store: StoreLocationType;
  };
  Account: {
    screen: keyof AuthStackParamsList;
  };
};

export type ShopStackParamsList = {
  HomeStack: undefined;
  ShopStack: { title: string; items: item[] };
  ItemDetail: { item: item };
  FilterOptions: undefined;
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

export type StoreLocationType = {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  openingHours: string[];
  latitude: number;
  longitude: number;
};

export type item = {
  id: string;
  name: string;
  image: string;
  price: number;
  tags: string[];
};

export type cartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  stock: number;
};

export type Review = {
  id?: string;
  userName: string;
  score: number;
  date: string;
  review: string;
};

export type DBitem = {
  name: string;
  price: number;
  images: string[];
  category: string;
  color: string;
  description: string;
  material: string;
  quantity: number;
  sizes: string[];
  style: string;
  reviews: Review[];
};
