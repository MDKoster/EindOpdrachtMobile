import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchScreenOption from "../components/SearchScreenOption";
import { useAppSelector } from "../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

const SearchScreen = () => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <SearchScreenOption category={"New"} screen={"SearchNew"} />
        <SearchScreenOption category={"Popular"} screen={"SearchPopular"} />
        <SearchScreenOption category={"Clothing"} screen={"SearchClothing"} />
        <SearchScreenOption category={"Shoes"} screen={"SearchShoes"} />
        <SearchScreenOption
          category={"Accessories"}
          screen={"SearchAccessories"}
        />
        <SearchScreenOption category={"Sports"} screen={"SearchSports"} />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
