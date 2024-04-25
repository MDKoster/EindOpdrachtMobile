import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

const SplashScreen = ({ images, duration }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start();
      if (currentImageIndex === images.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [duration, images.length]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={images[currentImageIndex]}
        resizeMode="cover"
        style={[styles.splashImage, { opacity: fadeAnim }]}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashImage: {
    flex: 1,
  },
});
