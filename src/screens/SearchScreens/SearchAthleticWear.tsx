import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";

const SearchAthleticWear = () => {
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
          category={"All"}
          parentCategory="Athletic Wear"
          screen={null}
        />
        <SearchScreenOption
          category={"Men's Clothing"}
          parentCategory="Athletic Wear"
          screen={null}
        />
        <SearchScreenOption
          category={"Women's Clothing"}
          parentCategory="Athletic Wear"
          screen={null}
        />
        <SearchScreenOption
          category={"Shoes"}
          parentCategory="Athletic Wear"
          screen={null}
        />
      </ScrollView>
    </View>
  );
};

export default SearchAthleticWear;

const styles = StyleSheet.create({});
