import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import ShopScreen from "../screens/ShopScreen";
import HomeScreen from "../screens/HomeScreen";
import ItemDetailComponent from "../components/ItemDetailComponent";
import FilterOptionsScreen from "../screens/FilterOptionsScreen";

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
      <Stack.Screen name="ItemDetail" component={ItemDetailComponent} />
      <Stack.Screen
        name="FilterOptions"
        component={FilterOptionsScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;

const styles = StyleSheet.create({});
