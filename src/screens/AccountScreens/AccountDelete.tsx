import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const AccountDelete = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

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
