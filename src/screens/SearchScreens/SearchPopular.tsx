import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import SearchScreenOption from "../../components/SearchScreenOption";

const SearchPopular = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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

export default SearchPopular;

const styles = StyleSheet.create({});
