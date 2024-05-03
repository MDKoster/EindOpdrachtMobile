import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  EasingFunction,
  Image,
  StyleSheet,
  View,
} from "react-native";

const SplashScreen = ({ images, duration }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const animate = (easing: EasingFunction) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration - 1000,
      useNativeDriver: true,
      delay: 0,
      easing: easing,
    }).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      animate(Easing.ease);
      if (currentImageIndex === images.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [duration, images.length, currentImageIndex, fadeAnim]);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={images[currentImageIndex]}
          resizeMode="cover"
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
