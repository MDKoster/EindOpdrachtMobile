import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreenExpo from "expo-splash-screen";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store";
import { PersistGate } from "redux-persist/integration/react";
import AuthContextProvider from "./src/contexts/AuthContext";
import * as Font from "expo-font";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          Exquite: require("./assets/fonts/Exquite.ttf"),
          Kingdom: require("./assets/fonts/Kingdom-Regular.ttf"),
        });
      } catch (error) {
        console.warn("Error loading fonts: ", error);
      } finally {
        setIsAppReady(true);
      }
    };

    loadFont();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreenExpo.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

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
