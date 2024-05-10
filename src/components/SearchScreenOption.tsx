import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

type Props = {
  category: string;
};

const SearchScreenOption = ({ category }: Props) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: 50,
          backgroundColor: "white",
          flex: 0.28,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 40,
          borderBottomWidth: 0.8,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 400 }}>{category}</Text>
        <Entypo name="chevron-small-right" size={35} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default SearchScreenOption;

const styles = StyleSheet.create({});
