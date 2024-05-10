import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchScreenOption from "../components/SearchScreenOption";

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 0.3 }}>
        <Image
          source={require("../../assets/images/search-background.jpg")}
          style={{ width: "100%", height: 200, position: "absolute" }}
        />
      </View>
      <View
        style={{
          height: 100,
          backgroundColor: "white",
          flex: 0.13,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomWidth: 0.8,
        }}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={28}
          color={"black"}
          style={{
            zIndex: 2,
            left: -30,
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          What are you looking for?
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <SearchScreenOption category={"New"} />
        <SearchScreenOption category={"Popular"} />
        <SearchScreenOption category={"Clothing"} />
        <SearchScreenOption category={"Shoes"} />
        <SearchScreenOption category={"Accessories"} />
        <SearchScreenOption category={"Sports"} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
        <SearchScreenOption category={"..."} />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
