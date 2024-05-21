import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

const FavouritesScreen = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          flex: 0.06,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: darkModeSelected ? "#740000" : "#060032",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: darkModeSelected ? "black" : "white",
          }}
        >
          MY FAVOURITES
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          margin: 20,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          shadowColor: darkModeSelected ? "white" : "black",
          elevation: 5,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            top: 20,
            color: darkModeSelected ? "white" : "black",
          }}
        >
          You have no favourites yet.
        </Text>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
