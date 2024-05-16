import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../assets/colors";

const SearchSports = () => {
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
        <SearchScreenOption category={"Fitness"} />
        <SearchScreenOption category={"Hiking"} />
        <SearchScreenOption category={"Team sports"} />
      </ScrollView>
    </View>
  );
};

export default SearchSports;

const styles = StyleSheet.create({});
