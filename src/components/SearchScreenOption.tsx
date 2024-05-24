import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SearchScreenProps, SearchStackParamsList } from "../navigation/types";
import { useAppSelector } from "../hooks/Selector";
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

  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

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
