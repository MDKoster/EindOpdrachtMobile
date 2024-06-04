import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const UserDetail = () => {
  const navigation =
    useNavigation<SettingsScreenProps<"UserDetail">["navigation"]>();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const [userURL, setUserURL] = useState(auth.currentUser?.photoURL);

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

  useEffect(() => {
    if (auth.currentUser?.photoURL) {
      setUserURL(auth.currentUser?.photoURL);
    }
  }, [auth.currentUser?.photoURL]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Entypo
          name="chevron-thin-left"
          size={20}
          color={darkModeSelected ? "white" : "black"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: darkModeSelected ? "white" : "black",
            }}
          >
            User Detail
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            console.log("Change profile picture pressed");
            navigation.navigate("Camera");
          }}
          style={{
            width: "50%",
            backgroundColor: "lightgrey",
            padding: 10,
          }}
        >
          {auth.currentUser?.photoURL != null ? (
            <Image
              source={{ uri: userURL }}
              style={{ width: 180, height: 180, borderRadius: 90 }}
            />
          ) : (
            <>
              <FontAwesome name="user-circle-o" size={180} color="grey" />
              <Text
                style={{ fontSize: 18, color: "grey", textAlign: "center" }}
              >
                Add an image
              </Text>
            </>
          )}
        </Pressable>
        <View
          style={{
            maxWidth: "50%",
            padding: 10,
          }}
        >
          <Text
            style={{
              flexWrap: "wrap",
              fontSize: 20,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {auth.currentUser?.displayName}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            elevation: 5,
            width: "100%",
            paddingHorizontal: 10,
            marginBottom: 5,
            shadowColor: darkModeSelected ? "white" : "black",
          }}
        >
          <Text
            style={{
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Name
          </Text>
          <Text
            style={{
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {auth.currentUser?.displayName}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            elevation: 5,
            width: "100%",
            paddingHorizontal: 10,
            marginBottom: 5,
            shadowColor: darkModeSelected ? "white" : "black",
          }}
        >
          <Text
            style={{
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Email
          </Text>
          <Text
            style={{
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {auth.currentUser?.email}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            elevation: 5,
            width: "100%",
            paddingHorizontal: 10,
            marginBottom: 5,
            shadowColor: darkModeSelected ? "white" : "black",
          }}
        >
          <Text
            style={{
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Password
          </Text>
          <Text
            style={{
              color: darkModeSelected ? "white" : "black",
            }}
          >
            ********
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flex: 0.4,
          alignItems: "center",
          width: "100%",
        }}
        onPress={handleSignOut}
      >
        <Text
          style={{
            textAlign: "center",
            borderRadius: 5,
            padding: 10,
            fontSize: 20,
            width: "80%",
            backgroundColor: "darkred",
            color: "white",
            elevation: 1,
          }}
        >
          LOG OUT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});
