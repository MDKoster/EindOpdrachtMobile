import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { item } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

type Props = {
  item: item;
};

const ItemListComponent = ({ item }: Props) => {
  const navigator = useNavigation();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <TouchableOpacity
      onPress={() => {
        navigator.navigate("ItemDetail", { item: item });
      }}
    >
      <View
        style={{
          height: 350,
          width: 189,
          margin: 4,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
        }}
      >
        <Image
          src={item.image}
          style={{
            flex: 3,
            width: "100%",
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              margin: 5,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              margin: 5,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            ${item.price / 100}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListComponent;

const styles = StyleSheet.create({});
