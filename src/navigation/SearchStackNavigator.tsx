import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchClothing from "../screens/SearchScreens/SearchClothing";
import SearchNew from "../screens/SearchScreens/SearchNew";
import SearchPopular from "../screens/SearchScreens/SearchPopular";
import SearchShoes from "../screens/SearchScreens/SearchShoes";
import SearchAccessories from "../screens/SearchScreens/SearchAccessories";
import SearchSports from "../screens/SearchScreens/SearchSports";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

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
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: darkModeSelected ? "white" : "black",
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
        <Stack.Screen name="SearchClothing" component={SearchClothing} />
        <Stack.Screen name="SearchShoes" component={SearchShoes} />
        <Stack.Screen name="SearchAccessories" component={SearchAccessories} />
        <Stack.Screen name="SearchSports" component={SearchSports} />
      </Stack.Navigator>
    </>
  );
};

export default SearchStackNavigator;

const styles = StyleSheet.create({});
