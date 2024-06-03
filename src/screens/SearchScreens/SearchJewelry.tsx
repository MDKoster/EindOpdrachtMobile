import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const SearchJewelry = () => {
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
        {" "}
        <SearchScreenOption
          category={"All"}
          parentCategory="Jewelry"
          screen={null}
        />
        <SearchScreenOption
          category={"Earrings"}
          parentCategory="Jewelry"
          screen={null}
        />
        <SearchScreenOption
          category={"Necklace"}
          parentCategory="Jewelry"
          screen={null}
        />
        <SearchScreenOption
          category={"Gold"}
          parentCategory="Jewelry"
          screen={null}
        />
        <SearchScreenOption
          category={"Silver"}
          parentCategory="Jewelry"
          screen={null}
        />
      </ScrollView>
    </View>
  );
};

export default SearchJewelry;

const styles = StyleSheet.create({});
