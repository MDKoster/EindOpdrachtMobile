import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";

const SearchSports = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
