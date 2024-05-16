import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useAppSelector } from "../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../assets/colors";

const NewsCardComponent = () => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 10,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
        minHeight: 300,
        elevation: 5,
        shadowColor: darkModeSelected ? "white" : "black",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: darkModeSelected ? "white" : "black",
          }}
        >
          NewsCardComponent
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCardComponent;

const styles = StyleSheet.create({});
