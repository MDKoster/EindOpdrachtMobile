import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/Selector";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../../store/LayoutReducer";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const AccountSettings = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();

  const setDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <Text
        style={{
          color: darkModeSelected ? "white" : "black",
        }}
      >
        AccountSettings
      </Text>
      <View
        style={{
          width: "90%",
          paddingHorizontal: 20,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
        }}
      >
        <Text
          style={{
            color: darkModeSelected ? "white" : "black",
          }}
        >
          Dark Mode is {darkModeSelected ? "enabled" : "disabled"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkModeSelected ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setDarkMode}
          value={darkModeSelected}
        />
      </View>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({});
