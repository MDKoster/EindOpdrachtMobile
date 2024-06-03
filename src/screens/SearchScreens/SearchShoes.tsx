import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const SearchShoes = () => {
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
        <SearchScreenOption category={"All"} parentCategory={"Shoes"} />
        <SearchScreenOption category={"Adidas"} parentCategory={"Shoes"} />
        <SearchScreenOption category={"Puma"} parentCategory={"Shoes"} />
        <SearchScreenOption category={"Nike"} parentCategory={"Shoes"} />
        <SearchScreenOption category={"Timberland"} parentCategory={"Shoes"} />
        <SearchScreenOption category={"Sneakers"} parentCategory={"Shoes"} />
        <SearchScreenOption category={"Heels"} parentCategory={"Shoes"} />
      </ScrollView>
    </View>
  );
};

export default SearchShoes;

const styles = StyleSheet.create({});
