import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

const NewsCardComponent = () => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 10,
        backgroundColor: "white",
        minHeight: 300,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Text>NewsCardComponent</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCardComponent;

const styles = StyleSheet.create({});
