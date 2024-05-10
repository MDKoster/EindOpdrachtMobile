import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const FavouritesScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <View
        style={{
          flex: 0.06,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060032",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
          }}
        >
          MY FAVOURITES
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          margin: 20,
          backgroundColor: "white",
          elevation: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, top: 20 }}>
          You have no favourites yet.
        </Text>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
