import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  FontAwesome6,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import AccountScreen from "../screens/AccountScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import { useAppSelector } from "../../store/Selector";
import ShopStackNavigator from "./ShopStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabBarHeight = useAppSelector((state) => state.navigation.tabBarHeight);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#060032",
          position: "absolute",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginHorizontal: 5,
        },
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "timing",
            config: {
              duration: 300,
            },
          },
          hide: {
            animation: "timing",
            config: {
              duration: 300,
            },
          },
        },

        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: "#CE0000",
        tabBarInactiveTintColor: "#CECECE",
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="shopware" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Favourites"}
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="heart" size={24} color={color} />
            ) : (
              <FontAwesome name="heart-o" size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name={"Search"}
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Bag"}
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="bag-handle-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="bag-handle-outline" size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name={"Account"}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ) : (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
