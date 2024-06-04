import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const CartStack = createStackNavigator();

const CartStackNavigator = () => {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <CartStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;

const styles = StyleSheet.create({});
