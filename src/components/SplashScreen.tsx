import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  EasingFunction,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { useAppSelector } from "../../store/Selector";

const SplashScreen = () => {
  const shownImageDuration = 3000;
  const images = useAppSelector((state) => state.image.images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const animate = (easing: EasingFunction) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: shownImageDuration - 1000,
      useNativeDriver: true,
      delay: 0,
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
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <Image
          source={images[currentImageIndex] as ImageSourcePropType}
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
