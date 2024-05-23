import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SuggestionItemComponent from "./SuggestionItemComponent";
import { useAppSelector } from "../hooks/Selector";
import {
  ShopScreenProps,
  ShopStackParamsList,
  item,
} from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

type Props = {
  items: item[];
  title: string;
};

const HomeSuggestionListComponent = ({ items, title }: Props) => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const navigator = useNavigation<ShopScreenProps<"ShopStack">["navigation"]>();

  return (
    <View>
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
          top: 5,
          left: 5,
        }}
        onPress={() =>
          navigator.navigate<keyof ShopStackParamsList>("ShopStack", {
            title: title,
            items: items,
          })
        }
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: darkModeSelected ? "white" : "black",
            textDecorationLine: "underline",
          }}
        >
          {title}
        </Text>
        <Entypo
          style={{
            marginTop: 5,
            marginLeft: 10,
          }}
          name="chevron-right"
          size={24}
          color="black"
        />
      </Pressable>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SuggestionItemComponent key={item.id} item={item} />
        )}
      />
    </View>
  );
};

export default HomeSuggestionListComponent;

const styles = StyleSheet.create({});
