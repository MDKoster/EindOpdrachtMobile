import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import ShopScreen from "../screens/ShopScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    >
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="ShopStack" component={ShopScreen} />
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;

const styles = StyleSheet.create({});
