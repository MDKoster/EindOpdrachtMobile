import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { cartItem } from "../navigation/types";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  addToShoppingCart,
  removeFromShoppingCart,
} from "../../store/UserReducer";

type Props = {
  item: cartItem;
};

const CheckoutComponent = ({ item }: Props) => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
        elevation: 5,
        shadowColor: darkModeSelected ? "white" : "black",
      }}
    >
      <Image
        src={item.image}
        style={{
          width: 80,
          height: 100,
          margin: 2,
        }}
      />
      <View
        style={{
          flex: 1,
          width: 140,
          paddingVertical: 5,
          marginLeft: 10,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            color: darkModeSelected ? "white" : "black",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 2,
            color: darkModeSelected ? "white" : "black",
          }}
        >
          Size: {item.size}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: darkModeSelected ? "white" : "black",
          }}
        >
          Unit price: ${item.price / 100}
        </Text>
      </View>
      <View
        style={{
          height: 100,
          width: 100,
          marginLeft: 10,
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginHorizontal: 10,
              marginBottom: 5,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            x
          </Text>

          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 10,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {item.quantity}
          </Text>
        </View>
        <Text
          style={{
            color: "red",
            marginTop: 5,
            marginRight: 5,
          }}
        >
          Total: ${((item.price * item.quantity) / 100).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CheckoutComponent;

const styles = StyleSheet.create({});
