import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../components/SplashScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Group
        screenOptions={{
          headerStyle: { backgroundColor: "red" },
          tabBarStyle: {
            backgroundColor: "red",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "grey",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="home" size={24} color="black" />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="map-o" size={24} color="black" />
            ),
          }}
        /> */}
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
