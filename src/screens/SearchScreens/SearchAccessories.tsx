import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";

const SearchAccessories = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <SearchScreenOption category={"Jewelry"} />
        <SearchScreenOption category={"Belts"} />
        <SearchScreenOption category={"Backpacks"} />
        <SearchScreenOption category={"Bags"} />
      </ScrollView>
    </View>
  );
};

export default SearchAccessories;

const styles = StyleSheet.create({});
