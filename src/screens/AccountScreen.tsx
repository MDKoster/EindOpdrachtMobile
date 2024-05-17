import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AccountComponent from "../components/AccountComponent";
import { useAppSelector } from "../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

const AccountScreen = () => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          flex: 1,
          margin: 20,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
        }}
      >
        <AccountComponent
          icon={
            <FontAwesome5
              name="user"
              size={24}
              color={darkModeSelected ? "white" : "black"}
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
              color={darkModeSelected ? "white" : "black"}
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
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
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
