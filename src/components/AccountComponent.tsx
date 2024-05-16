import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SettingsStackParamsList } from "../navigation/types";
import { useAppSelector } from "../../store/Selector";

type Props = {
  icon?: any;
  mainText: string;
  subText?: string;
  screen?: keyof SettingsStackParamsList;
};

const AccountComponent = ({ icon, mainText, subText, screen }: Props) => {
  const navigation = useNavigation();
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.8,
        borderColor: darkModeSelected ? "white" : "#e5e5e5",
      }}
      onPress={() =>
        screen && navigation.navigate<keyof SettingsStackParamsList>(screen)
      }
    >
      {icon}
      <View
        style={
          icon === null
            ? {
                paddingLeft: 50,
              }
            : null
        }
      >
        <Text
          style={{
            fontSize: 16,
            color:
              mainText === "Delete my account"
                ? "#E00204"
                : darkModeSelected
                ? "white"
                : "black",
          }}
        >
          {mainText}
        </Text>
        {subText && (
          <Text style={{ fontSize: 14, color: "grey" }}>{subText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AccountComponent;

const styles = StyleSheet.create({});
