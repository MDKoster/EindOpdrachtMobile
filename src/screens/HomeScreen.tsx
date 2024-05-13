import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
  View,
  TextInput,
  Text,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSuggestionListComponent from "../components/HomeSuggestionListComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<ScrollView>(null);
  const suggestionRef = useRef<ScrollView>(null);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  //temporary images. Will be replaced with actual data from the server
  const images: ImageSourcePropType[] = [
    require("../../assets/images/female-outfit-1.jpg"),
    require("../../assets/images/female-dress.jpg"),
    require("../../assets/images/male-outfit-1.jpg"),
    require("../../assets/images/male-outfit-2.jpg"),
    require("../../assets/images/female-sweater-1.jpg"),
    require("../../assets/images/male-outfit-3.jpg"),
  ];
  const newArrivalsImages: ImageSourcePropType[] = [
    require("../../assets/images/splash3.jpg"),
    require("../../assets/images/splash5.jpg"),
    require("../../assets/images/splash6.jpg"),
    require("../../assets/images/training-female.jpg"),
    require("../../assets/images/male-outfit-3.jpg"),
    require("../../assets/images/female-sweater-3.jpg"),
  ];
  const mensFashionImages: ImageSourcePropType[] = [
    require("../../assets/images/male-outfit-1.jpg"),
    require("../../assets/images/male-outfit-2.jpg"),
    require("../../assets/images/male-pants-1.jpg"),
    require("../../assets/images/shirt-sunglasses-male.jpg"),
    require("../../assets/images/tshirt-male.jpg"),
    require("../../assets/images/splash2.jpg"),
  ];
  const womensFashionImages: ImageSourcePropType[] = [
    require("../../assets/images/female-dress.jpg"),
    require("../../assets/images/female-outfit-1.jpg"),
    require("../../assets/images/female-outfit-black.jpg"),
    require("../../assets/images/female-sweater-1.jpg"),
    require("../../assets/images/female-sweater-2.jpg"),
    require("../../assets/images/female-sweater-4.jpg"),
  ];

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current !== null) {
        let nextX = 0;
        if (currentX + 1 < 3) nextX = currentX + 1;
        scrollViewRef.current.scrollTo({
          x: windowWidth * nextX,
          animated: true,
        });
        setCurrentX(nextX);
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [currentX]);

  const animatedFlex = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const animatedRadius = useRef(new Animated.Value(0)).current;
  const toggleFlex = (targetValue: number) => {
    Animated.timing(animatedFlex, {
      toValue: { x: 0, y: targetValue },
      duration: 150,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() =>
      Animated.timing(animatedRadius, {
        toValue: targetValue === 0 ? 25 : 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start()
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            style={{ zIndex: 2, top: 38, left: 35, color: "grey" }}
          />
          <TextInput
            style={{
              top: 30,
              opacity: 0.8,
              textAlign: "center",
              paddingHorizontal: 40,
              backgroundColor: "white",
              width: 200,
              height: 40,
              borderRadius: 10,
            }}
            placeholder="Search"
          ></TextInput>
        </View>
        <Text
          style={{
            position: "absolute",
            zIndex: 1,
            top: 120,
            right: 30,
            color: "gold",
            fontSize: 45,
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          Summer
        </Text>
        <Text
          style={{
            position: "absolute",
            zIndex: 1,
            top: 160,
            right: 20,
            color: "gold",
            fontSize: 55,
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          Collection
        </Text>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1, position: "absolute" }}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          //The currentX state is updated when the user scrolls horizontally so the correct image is displayed (and the others that follow)
          onScroll={(event) => {
            setCurrentX(
              Math.round(event.nativeEvent.contentOffset.x / windowWidth)
            );
          }}
        >
          <Image
            source={require("../../assets/images/female-summer-banner.jpg")}
            style={{ width: windowWidth, height: 350 }}
          />
          <Image
            source={require("../../assets/images/urban-stylish-male.jpg")}
            style={{ width: windowWidth, height: 350 }}
          />
          <Image
            source={require("../../assets/images/outdoors-banner.jpg")}
            style={{ width: windowWidth, height: 350 }}
          />
        </ScrollView>
      </View>
      <Animated.View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: animatedRadius,
          borderTopRightRadius: animatedRadius,
          overflow: "hidden",
          zIndex: 2,
          height: animatedFlex.y.interpolate({
            inputRange: [0, 1],
            outputRange: ["60%", "100%"],
          }),
        }}
      >
        <ScrollView
          ref={suggestionRef}
          showsVerticalScrollIndicator={false}
          decelerationRate={0.8}
          //toggleFlex changes the height of the parent view.
          //The direction of the scroll is checked to determine the height of the parent view.
          //Y-offset bigger than 0 means the user is scrolling down (moving thumb up), and vice versa
          onScroll={(event) => {
            toggleFlex(event.nativeEvent.contentOffset.y > 0 ? 1 : 0);
          }}
        >
          <HomeSuggestionListComponent images={images} title="Popular" />
          <HomeSuggestionListComponent
            images={newArrivalsImages}
            title="New Arrivals"
          />
          <HomeSuggestionListComponent
            images={mensFashionImages}
            title="Men's Fashion"
          />
          <HomeSuggestionListComponent
            images={womensFashionImages}
            title="Women's Fashion"
          />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
