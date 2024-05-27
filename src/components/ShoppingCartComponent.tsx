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

const ShoppingCartComponent = ({ item }: Props) => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
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
          width: 120,
          height: 140,
          margin: 2,
        }}
      />
      <View
        style={{
          flex: 1,
          height: 140,
          marginLeft: 10,
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            fontSize: 18,
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
          height: 140,
          marginLeft: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            marginHorizontal: 10,
            marginBottom: 5,
            color: darkModeSelected ? "white" : "black",
          }}
        >
          Amount
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(removeFromShoppingCart(item.id));
            }}
          >
            <AntDesign
              name="minus"
              size={18}
              color={darkModeSelected ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 10,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(addToShoppingCart(item));
            }}
            style={{
              pointerEvents: item.quantity === item.stock ? "none" : "auto",
            }}
          >
            <AntDesign
              name="plus"
              size={18}
              color={
                item.quantity === item.stock
                  ? "lightgrey"
                  : darkModeSelected
                  ? "white"
                  : "black"
              }
            />
          </TouchableOpacity>
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

export default ShoppingCartComponent;

const styles = StyleSheet.create({});
