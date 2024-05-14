import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type Props = {
  icon?: any;
  mainText: string;
  subText?: string;
  screen?: any;
};

const AccountComponent = ({ icon, mainText, subText, screen }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.8,
        borderColor: "#e5e5e5",
      }}
      onPress={() => screen && navigation.navigate(screen)}
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
        <Text style={{ fontSize: 16 }}>{mainText}</Text>
        {subText && (
          <Text style={{ fontSize: 14, color: "grey" }}>{subText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AccountComponent;

const styles = StyleSheet.create({});
