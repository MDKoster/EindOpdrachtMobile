import { Text, StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { ShopScreenProps, ShopStackParamsList } from "../navigation/types";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import ItemListComponent from "../components/ItemListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const ShopScreen = () => {
  const navigator = useNavigation<ShopScreenProps<"ShopStack">["navigation"]>();
  const {
    params: { title, items },
  } = useRoute<ShopScreenProps<"ShopStack">["route"]>();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Pressable onPress={navigator.goBack}>
          <Entypo name="chevron-thin-left" size={24} color="black" />
        </Pressable>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              top: 5,
              right: 5,
              fontSize: 38,
              fontFamily: "Exquite",
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <FlatList
          numColumns={2}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemListComponent key={item.id} item={item} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
