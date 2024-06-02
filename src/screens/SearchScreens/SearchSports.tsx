import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const SearchSports = () => {
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
        <SearchScreenOption category={"Fitness"} parentCategory={"Sports"} />
        <SearchScreenOption category={"Hiking"} parentCategory={"Sports"} />
        <SearchScreenOption
          category={"Team sports"}
          parentCategory={"Sports"}
        />
      </ScrollView>
    </View>
  );
};

export default SearchSports;

const styles = StyleSheet.create({});
