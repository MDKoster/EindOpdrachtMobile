import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  EasingFunction,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { useAppSelector } from "../hooks/Selector";

const SplashScreen = () => {
  const shownImageDuration = 6000;
  const images = useAppSelector((state) => state.layout.images);
  const windowHeight = Dimensions.get("window").height;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const animate = (easing: EasingFunction) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
      delay: shownImageDuration - 2000,
      easing: easing,
    }).start();
  };

  useEffect(() => {
    animate(Easing.ease);
    const interval = setInterval(() => {
      if (currentImageIndex === images.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    }, shownImageDuration);

    return () => clearInterval(interval);
  }, [shownImageDuration, images.length, currentImageIndex]);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          position: "absolute",
          flex: 1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/gizmo.png")}
          resizeMode="contain"
          style={{
            flex: 1,
            width: "100%",
          }}
        />
      </View>
      <Animated.View
        style={{ opacity: fadeAnim, flex: 1, zIndex: 0, alignItems: "center" }}
      >
        <Image
          source={images[currentImageIndex] as ImageSourcePropType}
          resizeMode="contain"
          style={styles.splashImage}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashImage: {
    flex: 1,
  },
});
