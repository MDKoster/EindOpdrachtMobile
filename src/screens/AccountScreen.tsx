import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AccountComponent from "../components/AccountComponent";
import LogInScreen from "./AccountScreens/LogInScreen";
import StoreLocator from "./AccountScreens/StoreLocator";
import AccountSettings from "./AccountScreens/AccountSettings";
import AboutGizmo from "./AccountScreens/AboutGizmo";
import Sustainability from "./AccountScreens/Sustainability";
import LatestNews from "./AccountScreens/LatestNews";
import HelpScreen from "./AccountScreens/HelpScreen";
import AccountDelete from "./AccountScreens/AccountDelete";
import AboutApp from "./AccountScreens/AboutApp";

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
          screen={"LogIn"}
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
          screen={"StoreLocator"}
        />
        <AccountComponent
          icon={null}
          mainText="Settings"
          screen={"AccountSettings"}
        />
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
        <AccountComponent
          icon={null}
          mainText="About Gizmo"
          screen={"AboutGizmo"}
        />
        <AccountComponent
          icon={null}
          mainText="Sustainability"
          screen={"Sustainability"}
        />
        <AccountComponent
          icon={null}
          mainText="Latest News"
          screen={"LatestNews"}
        />
        <AccountComponent icon={null} mainText="Help & Info" screen={"Help"} />
        <AccountComponent
          icon={null}
          mainText="Delete my account"
          screen={"AccountDelete"}
        />
        <AccountComponent
          icon={null}
          mainText="About this app"
          screen={"AboutApp"}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
