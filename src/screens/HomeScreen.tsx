import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSuggestionListComponent from "../components/HomeSuggestionListComponent";

const HomeScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentX, setCurrentX] = useState(0);
  const [suggestionViewFlexValue, setSuggestionViewFlexValue] = useState(1);
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
        // const nextX = currentX + 1 < 3 ? currentX + 1 : 0;
        scrollViewRef.current.scrollTo({
          x: windowWidth * nextX,
          animated: true,
        });
        setCurrentX(nextX);
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [currentX]);

  const flexValue = new Animated.Value(1);
  const toggleFlex = () => {
    const newValue = suggestionViewFlexValue === 1 ? 2 : 1;
    Animated.timing(flexValue, {
      toValue: newValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setSuggestionViewFlexValue(newValue);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
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
      <View
        style={{
          flex: suggestionViewFlexValue,
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          bottom: 75,
          overflow: "hidden",
        }}
      >
        <ScrollView
          onScroll={(event) => {
            //TODO: Fix scroll event
            toggleFlex();
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
      </View>
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
