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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSuggestionListComponent from "../components/HomeSuggestionListComponent";

const HomeScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<ScrollView>(null);
  const suggestionRef = useRef<ScrollView>(null);
  const [currentX, setCurrentX] = useState(0);
  const [delayScroll, setDelayScroll] = useState(true);
  const [images, setImages] = useState([
    require("../../assets/images/female-outfit-1.jpg"),
    require("../../assets/images/female-dress.jpg"),
    require("../../assets/images/male-outfit-1.jpg"),
    require("../../assets/images/male-outfit-2.jpg"),
    require("../../assets/images/female-sweater-1.jpg"),
    require("../../assets/images/male-outfit-3.jpg"),
  ]);

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

  //TODO: don't do an animation from 1 to 2, register the y-offset value of every scroll event
  // and add it to the height of the parent view (up to a certain limit) when the user scrolls down
  // When the user scrolls back up, the height of the parent view should decrease only when the scrollview
  // reaches the top
  const flexValue = useRef(new Animated.Value(1)).current;
  const toggleFlex = (targetValue: number) => {
    Animated.timing(flexValue, {
      toValue: targetValue,
      duration: 150,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(({ finished }) => {
      finished
        ? (flexValue.setValue(targetValue),
          targetValue === 2 && setDelayScroll(true))
        : null;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput
          style={{
            position: "absolute",
            top: 30,
            zIndex: 1,
            opacity: 0.8,
            textAlign: "center",
            paddingHorizontal: 10,
            backgroundColor: "white",
            width: 200,
            height: 40,
            borderRadius: 10,
          }}
          placeholder="Search"
        ></TextInput>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
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
          flex: flexValue,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          bottom: 75,
          overflow: "hidden",
        }}
      >
        <ScrollView
          ref={suggestionRef}
          disableScrollViewPanResponder={delayScroll}
          //toggleFlex changes the height of the parent view.
          //The direction of the scroll is checked to determine the height of the parent view.
          //Y-offset bigger than 0 means the user is scrolling down (moving thumb up), and vice versa
          onScroll={(event) => {
            toggleFlex(event.nativeEvent.contentOffset.y > 0 ? 2 : 1);
          }}
        >
          <HomeSuggestionListComponent images={images} title="Popular" />
          <HomeSuggestionListComponent images={images} title="New Arrivals" />
          <HomeSuggestionListComponent images={images} title="Men's Fashion" />
          <HomeSuggestionListComponent
            images={images}
            title="Women's Fashion"
          />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardImage: {
    width: 130,
    height: 220,
    marginHorizontal: 10,
    marginTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 0.4,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardDetails: {
    height: 50,
    width: 130,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 0.4,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
