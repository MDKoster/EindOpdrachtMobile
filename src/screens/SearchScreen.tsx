import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import SearchScreenOption from "../components/SearchScreenOption";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

const SearchScreen = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

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
        <SearchScreenOption
          category="Men's clothing"
          parentCategory="Men's Fashion"
          screen={null}
        />
        <SearchScreenOption
          category="Women's clothing"
          parentCategory="Women's Fashion"
          screen={null}
        />

        <SearchScreenOption
          category={"Athletic Wear"}
          screen={"SearchAthleticWear"}
        />
        <SearchScreenOption category={"Shoes"} screen={"SearchShoes"} />
        <SearchScreenOption category={"Jewelry"} screen={"SearchJewelry"} />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
