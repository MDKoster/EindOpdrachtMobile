import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const SearchAccessories = () => {
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
        <SearchScreenOption
          category={"Earrings"}
          parentCategory="Accessories"
        />
        <SearchScreenOption
          category={"Necklaces"}
          parentCategory="Accessories"
        />
        <SearchScreenOption category={"Watches"} parentCategory="Accessories" />
      </ScrollView>
    </View>
  );
};

export default SearchAccessories;

const styles = StyleSheet.create({});
