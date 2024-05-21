import React from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreenExpo from "expo-splash-screen";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store";
import { PersistGate } from "redux-persist/integration/react";
import AuthContextProvider from "./src/contexts/AuthContext";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const onLayoutRootView = async () => {
    await SplashScreenExpo.hideAsync();
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthContextProvider>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </AuthContextProvider>
        </PersistGate>
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
