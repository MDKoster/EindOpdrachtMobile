import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SearchScreenProps, SearchStackParamsList } from "../navigation/types";
import { useAppSelector } from "../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

type Props = {
  category: string;
  screen?: keyof SearchStackParamsList;
};

const SearchScreenOption = ({ category, screen }: Props) => {
  const navigator =
    useNavigation<SearchScreenProps<"SearchMain">["navigation"]>();

  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <TouchableOpacity
      onPress={() =>
        screen && navigator.navigate<keyof SearchStackParamsList>(screen)
      }
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
          borderBottomWidth: 0.8,
          borderColor: darkModeSelected ? "white" : "black",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: darkModeSelected ? "white" : "black",
          }}
        >
          {category}
        </Text>
        <Entypo
          name="chevron-small-right"
          size={35}
          color={darkModeSelected ? "white" : "black"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchScreenOption;

const styles = StyleSheet.create({});
