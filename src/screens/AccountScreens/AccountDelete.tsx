import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";

const AccountDelete = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const [deleteInput, setDeleteInput] = useState("");
  const navigator = useNavigation();

  const handleDelete = () => {
    auth.currentUser.delete();
    auth.signOut();
    setDeleteInput("");
    Alert.alert("Success", "Your account has been deleted");
    navigator.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <Text
        style={{
          marginBottom: 25,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Are you sure you want to delete your account?
      </Text>
      <Text
        style={{
          marginBottom: 25,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Type{" "}
        <Text
          style={{
            color: "red",
          }}
        >
          "delete"
        </Text>{" "}
        to confirm
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: darkModeSelected ? "white" : "black",
          borderRadius: 10,
          padding: 5,
          margin: 10,
        }}
        autoCapitalize="none"
        onChange={(e) => setDeleteInput(e.nativeEvent.text)}
      />
      <Button
        disabled={deleteInput !== "delete"}
        title="Delete"
        color={"red"}
        onPress={handleDelete}
      />
    </View>
  );
};

export default AccountDelete;

const styles = StyleSheet.create({});
