import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  FontAwesome6,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import React, { useEffect } from "react";
import FavouritesScreen from "../screens/FavouritesScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import { useAppSelector } from "../hooks/Selector";
import ShopStackNavigator from "./ShopStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabBarHeight = useAppSelector((state) => state.navigation.tabBarHeight);
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  useEffect(() => {
    StatusBar.setBackgroundColor(darkModeSelected ? "#18191A" : "transparent");
    StatusBar.setBarStyle(darkModeSelected ? "light-content" : "dark-content");
  }, [darkModeSelected]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: darkModeSelected ? "#740000" : "#060032",
          position: "absolute",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: tabBarHeight,
          marginHorizontal: 5,
          borderColor: "transparent",
          shadowColor: "transparent",
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
        tabBarActiveTintColor: darkModeSelected ? "#786DFF" : "#CE0000",
        tabBarInactiveTintColor: "#CEFFFF",
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
          //tabbarbadge is used to show the number of items in the cart
          tabBarBadge: 3,
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
        component={SettingsStackNavigator}
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
