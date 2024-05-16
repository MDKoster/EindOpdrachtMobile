import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../assets/colors";

const AccountDelete = () => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <Text>AccountDelete</Text>
    </View>
  );
};

export default AccountDelete;

const styles = StyleSheet.create({});
