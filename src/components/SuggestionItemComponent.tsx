import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { ShopStackParamsList, item } from "../navigation/types";

type Props = {
  item: item;
};

const SuggestionItemComponent = ({ item }: Props) => {
  const navigator = useNavigation();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigator.navigate<keyof ShopStackParamsList>({
            name: "ItemDetail",
            params: { item: item },
          });
        }}
      >
        <Image
          src={item.image}
          style={[
            styles.cardImage,
            {
              borderColor: darkModeSelected ? "white" : "black",
              backgroundColor: darkModeSelected
                ? darkModeBackgroundColor
                : lightModeBackgroundColor,
              shadowColor: darkModeSelected ? "white" : "black",
            },
          ]}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.cardDetails,
          {
            backgroundColor: darkModeSelected ? "#CECECE" : "white",
            shadowColor: darkModeSelected ? "white" : "black",
          },
        ]}
      >
        <Text style={{ fontSize: 12, fontWeight: "500" }}>{item.name}</Text>
        <Text style={{ fontSize: 12, margin: 5 }}>${item.price / 100}</Text>
      </View>
    </View>
  );
};

export default SuggestionItemComponent;

const styles = StyleSheet.create({
  cardImage: {
    width: 170,
    height: 260,
    marginHorizontal: 5,
    marginTop: 5,
    elevation: 5,
  },
  cardDetails: {
    height: 70,
    width: 170,
    paddingLeft: 5,
    marginHorizontal: 5,
    marginBottom: 5,
    elevation: 5,
    justifyContent: "center",
  },
});
