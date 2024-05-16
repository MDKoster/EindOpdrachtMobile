import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ShopScreenProps, ShopStackParamsList } from "../navigation/types";
import { useAppSelector } from "../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../assets/colors";

const ShopScreen = () => {
  const navigator = useNavigation<ShopScreenProps<"ShopStack">["navigation"]>();
  const {
    params: { item },
  } = useRoute<ShopScreenProps<"ShopStack">["route"]>();
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          zIndex: 1,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          opacity: 0.8,
          borderRadius: 50,
          borderWidth: 0.4,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigator.navigate<keyof ShopStackParamsList>("HomeStack")
          }
        >
          <Entypo
            name="chevron-left"
            size={48}
            color={darkModeSelected ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image source={item} style={{ flex: 1, width: "100%" }} />
      </View>
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
