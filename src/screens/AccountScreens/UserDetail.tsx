import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  emptyShoppingCart,
  setFavorites,
  setUser,
} from "../../../store/UserReducer";
import { useAuth } from "../../hooks/useAuth";
import {
  SettingsScreenProps,
  SettingsStackParamsList,
} from "../../navigation/types";

const UserDetail = () => {
  const navigation =
    useNavigation<SettingsScreenProps<"UserDetail">["navigation"]>();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const handleSignOut = () => {
    try {
      logout();
      console.log(
        "User signed out successfully: " + auth.currentUser?.displayName
      );

      dispatch(setUser(null));
      dispatch(setFavorites([]));
      dispatch(emptyShoppingCart());
      navigation.navigate<keyof SettingsStackParamsList>("AccountMain");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>UserDetail</Text>
      <Button title="Log out" onPress={handleSignOut} />
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
