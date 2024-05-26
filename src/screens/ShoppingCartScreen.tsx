import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../hooks/Selector";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import ShoppingCartComponent from "../components/ShoppingCartComponent";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { cartItem } from "../navigation/types";

const ShoppingCartScreen = () => {
  const navigator = useNavigation();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const shoppingCart = useAppSelector((state) => state.user.shoppingCart);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      {shoppingCart == null || shoppingCart?.length == 0 ? (
        <>
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: darkModeSelected ? "black" : "transparent",
              opacity: 0.4,
              zIndex: 1,
            }}
          />
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/eindopdrachtmobile-7ceb5.appspot.com/o/empty-bag.jpg?alt=media&token=c5ea0f90-1385-41a3-9fe9-d176a82cc299"
            }
            style={{
              resizeMode: "cover",
              height: "111%",
              width: "100%",
              position: "absolute",
              zIndex: 0,
            }}
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                marginTop: 30,
                flex: 1,
                color: "white",
                fontSize: 35,
                justifyContent: "center",
                fontFamily: "Exquite",
              }}
            >
              There's nothing here...
            </Text>
            <Text
              style={{
                flex: 1,
                color: "white",
                fontSize: 28,
                fontFamily: "Exquite",
              }}
            >
              Add some items to your cart!
            </Text>
            <View
              style={{
                flex: 8,
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <TouchableOpacity onPress={() => navigator.navigate("HomeStack")}>
                <View
                  style={{
                    backgroundColor: darkModeSelected
                      ? "#D6D1AC3F"
                      : "#0600323F",
                    marginTop: 180,
                    flex: 0.28,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: darkModeSelected ? "lightgrey" : "white",
                    borderRadius: 15,
                    padding: 25,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: "Exquite",
                      color: darkModeSelected ? "lightgrey" : "white",
                    }}
                  >
                    Start shopping!
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 0.06,
              minHeight: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: darkModeSelected ? "#740000" : "#060032",
              width: "100%",
            }}
          >
            <Text
              style={{
                top: 2,
                fontSize: 32,
                fontFamily: "Exquite",
                color: "white",
              }}
            >
              SHOPPING BAG
            </Text>
          </View>
          <FlatList
            data={shoppingCart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ShoppingCartComponent item={item} />}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 55,
              right: 0,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
            onPress={() => {}}
          >
            <View
              style={{
                backgroundColor: darkModeSelected ? "#FF1819" : "#A2C1FF",
                flexDirection: "row",
                alignItems: "center",
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  fontSize: 20,
                  fontFamily: "Exquite",
                  color: darkModeSelected ? "lightgrey" : "black",
                  textShadowColor: darkModeSelected ? "white" : "black",
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  textShadowRadius: 2,
                }}
              >
                Proceed to checkout
              </Text>
            </View>
          </TouchableOpacity>
        </GestureHandlerRootView>
      )}
    </SafeAreaView>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({});
