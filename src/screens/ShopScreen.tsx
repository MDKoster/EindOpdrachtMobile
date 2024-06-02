import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { ShopScreenProps } from "../navigation/types";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import ItemListComponent from "../components/ItemListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { setFilterOptions } from "../../store/ShopReducer";
import { useDispatch } from "react-redux";

const ShopScreen = () => {
  const navigator = useNavigation<ShopScreenProps<"ShopStack">["navigation"]>();
  const {
    params: { title, items },
  } = useRoute<ShopScreenProps<"ShopStack">["route"]>();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();
  const filterOptions = useAppSelector((state) => state.shop.filterOptions);
  const [itemsToDisplay, setItemsToDisplay] = useState(items);

  useEffect(() => {
    if (!filterOptions || filterOptions.length === 0) {
      setItemsToDisplay(items);
    } else {
      const filteredItems = items.filter((item) =>
        filterOptions.every((filter) =>
          item.tags.includes(filter.toLowerCase())
        )
      );
      setItemsToDisplay(filteredItems);
    }
  }, [filterOptions]);

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
          <Entypo
            name="chevron-thin-left"
            size={24}
            color={darkModeSelected ? "white" : "black"}
          />
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
          height: 40,
          borderRadius: 2,
          marginHorizontal: 10,
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 35,
            flexDirection: "row",
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            alignItems: "center",
            elevation: 1,
            borderRadius: 5,
            borderColor: "lightgrey",
            borderWidth: 1,
            margin: 5,
            flex: 0.78,
          }}
        >
          <FlatList
            horizontal
            data={filterOptions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 5,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: "lightgrey",
                  backgroundColor: darkModeSelected ? "cacaff" : "#f1f1f1",
                  elevation: 3,
                  shadowColor: darkModeSelected ? "white" : "grey",
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingRight: 5,
                    paddingVertical: 1,
                    fontSize: 16,
                    color: darkModeSelected ? "white" : "black",
                  }}
                >
                  {item}
                </Text>
                <TouchableOpacity
                  style={{
                    paddingRight: 5,
                  }}
                >
                  <AntDesign
                    name="closecircleo"
                    size={14}
                    color={darkModeSelected ? "white" : "black"}
                    onPress={() => {
                      dispatch(
                        setFilterOptions(
                          [...filterOptions].filter((option) => option !== item)
                        )
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          style={{
            flex: 0.22,
            height: 35,
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "lightgrey",
            padding: 5,
            alignItems: "center",
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            elevation: 1,
          }}
          onPress={() => navigator.navigate("FilterOptions")}
        >
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 16,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Filter
          </Text>
          <Ionicons
            name="filter"
            size={20}
            color={darkModeSelected ? "white" : "black"}
            style={{
              paddingRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <FlatList
          numColumns={2}
          data={itemsToDisplay}
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
