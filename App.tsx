import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreenExpo from "expo-splash-screen";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/Store";
import SplashScreen from "./src/components/SplashScreen";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  // const onLayoutRootView = async () => {
  //   await SplashScreenExpo.hideAsync();
  // };

  return (
    <View
      style={styles.container}
      // onLayout={onLayoutRootView}
    >
      <Provider store={store}>
        <NavigationContainer>
          {/* <SplashScreen /> */}
          <TabNavigator />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
