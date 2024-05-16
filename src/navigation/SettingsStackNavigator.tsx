import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import StoreLocator from "../screens/AccountScreens/StoreLocator";
import AccountSettings from "../screens/AccountScreens/AccountSettings";
import AboutGizmo from "../screens/AccountScreens/AboutGizmo";
import Sustainability from "../screens/AccountScreens/Sustainability";
import LatestNews from "../screens/AccountScreens/LatestNews";
import HelpScreen from "../screens/AccountScreens/HelpScreen";
import AccountDelete from "../screens/AccountScreens/AccountDelete";
import AboutApp from "../screens/AccountScreens/AboutApp";
import MapMarkerDetailScreen from "../screens/AccountScreens/MapMarkerDetailScreen";
import AuthStackNavigator from "./AuthStackNavigator";

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <Stack.Screen name="AccountMain" component={AccountScreen} />
      <Stack.Screen name="LogIn" component={AuthStackNavigator} />
      <Stack.Screen name="StoreLocator" component={StoreLocator} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="AboutGizmo" component={AboutGizmo} />
      <Stack.Screen name="Sustainability" component={Sustainability} />
      <Stack.Screen name="LatestNews" component={LatestNews} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="AccountDelete" component={AccountDelete} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
      <Stack.Screen
        name="MapMarkerDetail"
        component={MapMarkerDetailScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;

const styles = StyleSheet.create({});
