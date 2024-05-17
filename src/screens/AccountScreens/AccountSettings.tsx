import { StyleSheet, Switch, Text, Touchable, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../store/Selector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../../store/ImageReducer";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const AccountSettings = () => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);
  const dispatch = useDispatch();
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
      <TouchableOpacity onPress={() => dispatch(toggleDarkMode())}>
        <View
          style={{
            backgroundColor: darkModeSelected ? "#D5C736" : "blue",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            width: 150,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: darkModeSelected ? "black" : "white",
            }}
          >
            Toggle Darkmode
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({});
