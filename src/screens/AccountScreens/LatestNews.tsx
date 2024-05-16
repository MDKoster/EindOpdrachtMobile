import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewsCardComponent from "../../components/NewsCardComponent";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../assets/colors";

const LatestNews = () => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 50,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 10,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <NewsCardComponent />
          <NewsCardComponent />
          <NewsCardComponent />
          <NewsCardComponent />
          <NewsCardComponent />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LatestNews;

const styles = StyleSheet.create({});
