import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

type Props = {
  icon?: any;
  mainText: string;
  subText?: string;
};

const AccountComponent = ({ icon, mainText, subText }: Props) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.8,
        borderColor: "#e5e5e5",
      }}
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
