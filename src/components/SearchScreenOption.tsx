import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  SearchScreenProps,
  SearchStackParamsList,
  ShopScreenProps,
} from "../navigation/types";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { useDispatch } from "react-redux";
import { setFilterOptions } from "../../store/ShopReducer";

type Props = {
  category: string;
  parentCategory: string;
  screen?: keyof SearchStackParamsList;
};

const SearchScreenOption = ({ category, parentCategory, screen }: Props) => {
  const navigator =
    useNavigation<SearchScreenProps<"SearchMain">["navigation"]>();
  const shopNavigator =
    useNavigation<ShopScreenProps<"ShopStack">["navigation"]>();

  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        screen
          ? navigator.navigate<keyof SearchStackParamsList>(screen)
          : (dispatch(setFilterOptions([category])),
            shopNavigator.navigate("ShopStack", {
              title: category,
              items: [],
            }));
        //TODO: Query correct list of items from db based on category
      }}
    >
      <View
        style={{
          height: 60,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          flex: 0.28,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 40,
          paddingRight: 10,
          borderBottomWidth: 0.8,
          borderColor: darkModeSelected ? "white" : "black",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontFamily: "Exquite",
            color: darkModeSelected ? "white" : "black",
            textShadowColor: darkModeSelected ? "yellow" : "white",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        >
          {category}
        </Text>
        <Entypo
          name="chevron-thin-right"
          size={24}
          color={darkModeSelected ? "white" : "black"}
          style={{
            textShadowColor: darkModeSelected ? "yellow" : "white",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 15,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchScreenOption;

const styles = StyleSheet.create({});
