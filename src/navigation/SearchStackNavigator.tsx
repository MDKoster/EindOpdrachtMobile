import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchNew from "../screens/SearchScreens/SearchNew";
import SearchPopular from "../screens/SearchScreens/SearchPopular";
import SearchShoes from "../screens/SearchScreens/SearchShoes";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import SearchAthleticWear from "../screens/SearchScreens/SearchAthleticWear";
import SearchJewelry from "../screens/SearchScreens/SearchJewelry";

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <>
      <View style={{ flex: 0.3 }}>
        <Image
          source={require("../../assets/images/search-background.jpg")}
          style={{ width: "100%", height: 200, position: "absolute" }}
        />
      </View>
      <View
        style={{
          height: 100,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          flex: 0.13,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomWidth: 0.8,
          borderTopWidth: 0.8,
          borderColor: darkModeSelected ? "white" : "black",
        }}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={28}
          color={darkModeSelected ? "white" : "black"}
          style={{
            zIndex: 2,
            left: -30,
            textShadowColor: darkModeSelected ? "yellow" : "white",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Exquite",
            color: darkModeSelected ? "white" : "black",
            textShadowColor: darkModeSelected ? "yellow" : "grey",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        >
          What are you looking for?
        </Text>
      </View>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="SearchMain" component={SearchScreen} />
        <Stack.Screen name="SearchNew" component={SearchNew} />
        <Stack.Screen name="SearchPopular" component={SearchPopular} />
        <Stack.Screen
          name="SearchAthleticWear"
          component={SearchAthleticWear}
        />
        <Stack.Screen name="SearchShoes" component={SearchShoes} />
        <Stack.Screen name="SearchJewelry" component={SearchJewelry} />
      </Stack.Navigator>
    </>
  );
};

export default SearchStackNavigator;

const styles = StyleSheet.create({});
