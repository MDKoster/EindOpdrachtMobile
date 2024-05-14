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
import { StackActions, useNavigation } from "@react-navigation/native";

const LogInScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
            backgroundColor: "white",
            elevation: 5,
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
            }}
          >
            Register
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
              }}
            >
              Name
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
              }}
              placeholder="Name"
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
              }}
              placeholder="Password"
            />
          </View>
          <Text>
            Already a member?{" "}
            <Text
              style={{ color: "#0000CC" }}
              onPress={() => {
                navigator.navigate("LogIn" as never);
              }}
            >
              Log in here!
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
