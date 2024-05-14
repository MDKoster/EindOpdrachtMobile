import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewsCardComponent from "../../components/NewsCardComponent";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const LatestNews = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 50,
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 10,
          backgroundColor: "white",
          elevation: 5,
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
