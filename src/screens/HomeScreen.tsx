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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSuggestionListComponent from "../components/HomeSuggestionListComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import {
  setMensFashionItems,
  setNewArrivalItems,
  setPopularItems,
  setWomensFashionItems,
} from "../../store/LayoutReducer";
import { item } from "../navigation/types";

const HomeScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<ScrollView>(null);
  const suggestionRef = useRef<ScrollView>(null);
  const [currentX, setCurrentX] = useState(0);
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();
  const popularItems = useAppSelector((state) => state.layout.popularItems);
  const newItems = useAppSelector((state) => state.layout.newArrivalItems);
  const mensItems = useAppSelector((state) => state.layout.mensFashionItems);
  const womensItems = useAppSelector(
    (state) => state.layout.womensFashionItems
  );
  const scrollY = useRef(new Animated.Value(0)).current;

  //fetch popular items (basic info)
  useEffect(() => {
    (async () => {
      const qsPop = await getCollection("categories/popular/items");
      dispatch(
        setPopularItems(
          qsPop.docs.map((ds) => ({ id: ds.id, ...ds.data() } as item))
        )
      );

      const qsNew = await getCollection("categories/newArrivals/items");
      dispatch(
        setNewArrivalItems(
          qsNew.docs.map((ds) => ({ id: ds.id, ...ds.data() } as item))
        )
      );

      const qsMen = await getCollection("categories/mensFashion/items");
      dispatch(
        setMensFashionItems(
          qsMen.docs.map((ds) => ({ id: ds.id, ...ds.data() } as item))
        )
      );

      const qsWomen = await getCollection("categories/womensFashion/items");
      dispatch(
        setWomensFashionItems(
          qsWomen.docs.map((ds) => ({ id: ds.id, ...ds.data() } as item))
        )
      );
    })();
  }, []);

  const getCollection = async (path: string) => {
    const q = query(collection(db, path));

    const qs = (async () => {
      try {
        return await getDocs(q);
      } catch (error) {
        console.log(error);
      }
    })();

    return qs;
  };

  //animation logic
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

  const translateY = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: [0, -175],
    extrapolate: "clamp",
  });
  //end animation logic

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          height: 28,
          width: "100%",
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          zIndex: 99,
          top: 0,
          position: "static",
        }}
      ></View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              style={{
                top: 38,
                left: 35,
                color: darkModeSelected ? "#f1f1f1" : "grey",
              }}
            />
            <TextInput
              style={{
                top: 30,
                opacity: 0.8,
                textAlign: "center",
                paddingHorizontal: 40,
                backgroundColor: darkModeSelected
                  ? darkModeBackgroundColor
                  : lightModeBackgroundColor,
                width: 200,
                height: 40,
                borderRadius: 10,
                color: darkModeSelected ? "#f1f1f1" : "black",
              }}
              placeholder="Search"
              placeholderTextColor={darkModeSelected ? "#f1f1f1" : "grey"}
            />
          </View>
          <Animated.Text
            style={{
              position: "absolute",
              top: 60,
              right: 15,
              color: "gold",
              fontSize: 130,
              fontWeight: 300,
              fontFamily: "Kingdom",
              zIndex: 1,
              transform: [{ translateY }],
            }}
          >
            Summer
          </Animated.Text>
          <Animated.Text
            style={{
              position: "absolute",
              top: 170,
              right: 60,
              color: "gold",
              fontSize: 70,
              fontFamily: "Kingdom",
              zIndex: 1,
              transform: [{ translateY }],
            }}
          >
            Collection
          </Animated.Text>
          <Animated.ScrollView
            ref={scrollViewRef}
            style={{
              flex: 1,
              position: "absolute",
              transform: [{ translateY }],
            }}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
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
          </Animated.ScrollView>
        </View>
        <Animated.ScrollView
          ref={suggestionRef}
          showsVerticalScrollIndicator={false}
          decelerationRate={0.8}
          style={{
            zIndex: 2,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View
            style={{
              height: 350,
              width: "100%",
              backfaceVisibility: "hidden",
              zIndex: 0,
            }}
          ></View>
          <View
            style={{
              flex: 1,
              backgroundColor: darkModeSelected
                ? darkModeBackgroundColor
                : lightModeBackgroundColor,
              paddingBottom: 50,
            }}
          >
            <HomeSuggestionListComponent items={popularItems} title="Popular" />
            <HomeSuggestionListComponent
              items={newItems}
              title="New Arrivals"
            />
            <HomeSuggestionListComponent
              items={mensItems}
              title="Men's Fashion"
            />
            <HomeSuggestionListComponent
              items={womensItems}
              title="Women's Fashion"
            />
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
