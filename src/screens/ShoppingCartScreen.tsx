import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/Selector";

const ShoppingCartScreen = () => {
  const navigator = useNavigation();
  const [emptyCartBackgroundImage, setEmptyCartBackgroundImage] = useState();
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            textShadowColor: "black",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
            fontSize: 30,
            justifyContent: "center",
          }}
        >
          There's nothing here...
        </Text>
        <Text
          style={{
            flex: 1,
            color: "white",
            fontSize: 20,
            textShadowColor: "black",
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
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
                backgroundColor: darkModeSelected ? "#D6D1AC3F" : "#0600323F",
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
                  fontWeight: 400,
                  color: darkModeSelected ? "lightgrey" : "white",
                }}
              >
                Start shopping!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({});
