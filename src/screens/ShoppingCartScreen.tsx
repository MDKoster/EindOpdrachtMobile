import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingCartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/empty-bag.jpg")}
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
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#0600323F",
                marginTop: 180,
                flex: 0.28,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 15,
                padding: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  color: "white",
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
