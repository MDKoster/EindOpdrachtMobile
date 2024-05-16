import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenProps, AuthStackParamsList } from "../../navigation/types";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../assets/colors";
import { useAppSelector } from "../../../store/Selector";

const LogInScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigation<AuthScreenProps<"Login">["navigation"]>();
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
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 0.9,
        }}
      >
        <View
          style={{
            minHeight: "86%",
            top: 25,
            margin: 20,
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            elevation: 5,
            shadowColor: darkModeSelected ? "white" : "black",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 0.2,
              fontSize: 24,
              fontWeight: 500,
              top: 40,
              marginBottom: 20,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Log into your account
          </Text>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 400,
                paddingVertical: 10,
                color: darkModeSelected ? "white" : "black",
              }}
            >
              Email
            </Text>
            <TextInput
              style={{
                opacity: 0.9,
                textAlign: "center",
                paddingHorizontal: 5,
                backgroundColor: "#fefefe",
                width: 250,
                height: 50,
                borderRadius: 10,
                elevation: 5,
                shadowColor: darkModeSelected ? "white" : "black",
              }}
              placeholder="Email"
            />
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 400,
                paddingVertical: 10,
                color: darkModeSelected ? "white" : "black",
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                opacity: 0.9,
                textAlign: "center",
                paddingHorizontal: 5,
                backgroundColor: "#fefefe",
                width: 250,
                height: 50,
                borderRadius: 10,
                elevation: 5,
                shadowColor: darkModeSelected ? "white" : "black",
              }}
              placeholder="Password"
            />
          </View>
          <Text
            style={{
              flex: 0.1,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Not a member?{" "}
            <Text
              style={{ color: darkModeSelected ? "#BBAEFF" : "#0000CC" }}
              onPress={() => {
                navigator.navigate<keyof AuthStackParamsList>("Register");
              }}
            >
              Register here!
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
