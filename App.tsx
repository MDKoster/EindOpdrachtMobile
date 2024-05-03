import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreenExpo from "expo-splash-screen";
import TabNavigator from "./src/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/components/SplashScreen";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const onLayoutRootView = async () => {
    await SplashScreenExpo.hideAsync();
  };

  return (
    // <View style={styles.container} onLayout={onLayoutRootView}>
    //   <NavigationContainer>
    //     <TabNavigator />
    //   </NavigationContainer>
    // </View>
    // );
    // return !isReady ? (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SplashScreen
        images={[
          require("./assets/images/splash2.jpg"),
          require("./assets/images/splash3.jpg"),
          require("./assets/images/splash4.jpg"),
          require("./assets/images/splash5.jpg"),
          require("./assets/images/splash6.jpg"),
          require("./assets/images/splash7.jpg"),
          require("./assets/images/splash8.jpg"),
        ]}
        duration={5000}
      />
    </View>

    // ) : (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
