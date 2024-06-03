import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const SearchPopular = () => {
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
        <SearchScreenOption category={"All"} parentCategory={"Popular"} />
        <SearchScreenOption
          category={"Men's Clothing"}
          parentCategory={"Popular"}
        />
        <SearchScreenOption
          category={"Women's Clothing"}
          parentCategory={"Popular"}
        />
        <SearchScreenOption category={"Jewelry"} parentCategory={"Popular"} />
      </ScrollView>
    </View>
  );
};

export default SearchPopular;

const styles = StyleSheet.create({});
