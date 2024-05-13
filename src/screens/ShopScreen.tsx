import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ShopScreen = () => {
  //TODO: ask David about typing for useNavigation vs passing it along as a prop
  const navigator = useNavigation();
  const route = useRoute();

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
          backgroundColor: "white",
          opacity: 0.8,
          borderRadius: 50,
          borderWidth: 0.4,
        }}
      >
        <TouchableOpacity
          onPress={() => navigator.navigate("HomeStack" as never)}
        >
          <Entypo name="chevron-left" size={48} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image source={route.params?.item} style={{ flex: 1, width: "100%" }} />
      </View>
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
