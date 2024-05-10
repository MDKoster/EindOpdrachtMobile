import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AccountComponent from "../components/AccountComponent";

const AccountScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <View
        style={{
          flex: 0.2,
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
          ACCOUNT & SETTINGS
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          margin: 20,
          backgroundColor: "white",
          elevation: 5,
        }}
      >
        <AccountComponent
          icon={
            <FontAwesome5
              name="user"
              size={24}
              color="black"
              style={{
                padding: 15,
              }}
            />
          }
          mainText="My Account"
          subText="Log in or create an account"
        />
        <AccountComponent
          icon={
            <Ionicons
              name="location-outline"
              size={28}
              color="black"
              style={{ padding: 11 }}
            />
          }
          mainText="Store Locator"
        />
        <AccountComponent icon={null} mainText="Settings" />
      </View>
      <View
        style={{
          flex: 2,
          margin: 20,
          marginBottom: 70,
          backgroundColor: "white",
          elevation: 5,
        }}
      >
        <AccountComponent icon={null} mainText="About Gizmo" />
        <AccountComponent icon={null} mainText="Sustainability" />
        <AccountComponent icon={null} mainText="Latest News" />
        <AccountComponent icon={null} mainText="Help & Info" />
        <AccountComponent icon={null} mainText="Delete my account" />
        <AccountComponent icon={null} mainText="About this app" />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
