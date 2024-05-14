import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  category: string;
  screen?: string;
};

const SearchScreenOption = ({ category, screen }: Props) => {
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => screen && navigator.navigate(screen as never)}
    >
      <View
        style={{
          height: 60,
          backgroundColor: "white",
          flex: 0.28,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
