import React from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreenExpo from "expo-splash-screen";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/Store";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const onLayoutRootView = async () => {
    await SplashScreenExpo.hideAsync();
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <NavigationContainer>
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
