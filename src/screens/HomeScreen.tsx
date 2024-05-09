import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = (props) => {
  const { navigation } = props;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <Image src="" /> */}
      </View>
      <View
        style={{
          flex: 2,
        }}
      ></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
