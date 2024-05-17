import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const SearchClothing = () => {
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
        <SearchScreenOption category={"Men's Clothing"} />
        <SearchScreenOption category={"Women's Clothing"} />
        <SearchScreenOption category={"Sports"} />
      </ScrollView>
    </View>
  );
};

export default SearchClothing;

const styles = StyleSheet.create({});
