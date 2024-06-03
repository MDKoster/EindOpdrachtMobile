import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  SearchScreenProps,
  SearchStackParamsList,
  ShopScreenProps,
  item,
} from "../navigation/types";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { useDispatch } from "react-redux";
import { setFilterOptions } from "../../store/ShopReducer";
import { db } from "../config/firebase";
import { collection, getDocs, query } from "firebase/firestore";

type Props = {
  category: string;
  parentCategory?: string;
  screen?: keyof SearchStackParamsList;
};

const SearchScreenOption = ({ category, parentCategory, screen }: Props) => {
  const navigator =
    useNavigation<SearchScreenProps<"SearchMain">["navigation"]>();
  const shopNavigator =
    useNavigation<ShopScreenProps<"ShopStack">["navigation"]>();

  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const [path, setPath] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    switch (parentCategory) {
      case "Popular":
        setPath("categories/popular/items");
        break;
      case "New":
        setPath("categories/newArrivals/items");
        break;
      case "Jewelry":
        setPath("categories/jewelry/items");
        break;
      case "Athletic Wear":
        setPath("categories/athleticwear/items");
        break;
      case "Shoes":
        setPath("categories/shoes/items");
        break;
      case "Sports":
        setPath("categories/sports/items");
        break;
      case "Men's Fashion":
        setPath("categories/mensFashion/items");
        break;
      case "Women's Fashion":
        setPath("categories/womensFashion/items");
        break;
      default:
        break;
    }
  }, []);

  const handleSearchOptionPress = () => {
    screen != null
      ? navigator.navigate<keyof SearchStackParamsList>(screen)
      : (async () => {
          category === "All"
            ? dispatch(setFilterOptions([]))
            : dispatch(setFilterOptions([category]));
          const q = query(collection(db, path));
          const qs = await getDocs(q);
          const qsDocs = qs.docs.map(
            (ds) => ({ id: ds.id, ...ds.data() } as item)
          );
          shopNavigator.navigate("ShopStack", {
            title: parentCategory,
            items: qsDocs,
          });
        })();
  };

  return (
    <TouchableOpacity onPress={handleSearchOptionPress}>
      <View
        style={{
          height: 60,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          flex: 0.28,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 40,
          paddingRight: 10,
          borderBottomWidth: 0.8,
          borderColor: darkModeSelected ? "white" : "black",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontFamily: "Exquite",
            color: darkModeSelected ? "white" : "black",
            textShadowColor: darkModeSelected ? "yellow" : "white",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        >
          {category}
        </Text>
        <Entypo
          name="chevron-thin-right"
          size={24}
          color={darkModeSelected ? "white" : "black"}
          style={{
            textShadowColor: darkModeSelected ? "yellow" : "white",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 15,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchScreenOption;

const styles = StyleSheet.create({});
