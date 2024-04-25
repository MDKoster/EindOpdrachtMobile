import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreenExpo from "expo-splash-screen";
import SplashScreen from "./src/components/SplashScreen";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <SplashScreen
        images={[
          require("./assets/images/splash1.jpg"),
          require("./assets/images/splash2.jpg"),
          require("./assets/images/splash3.jpg"),
          require("./assets/images/splash4.jpg"),
          require("./assets/images/splash5.jpg"),
          require("./assets/images/splash6.jpg"),
          require("./assets/images/splash7.jpg"),
          require("./assets/images/splash8.jpg"),
        ]}
        duration={3000}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
