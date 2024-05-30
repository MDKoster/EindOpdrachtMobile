import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useAppSelector } from "../hooks/Selector";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import {
  Brands,
  Colors,
  Jewelry,
  Materials,
  Styles,
  Types,
} from "../../util/filterOptions";
import { useNavigation } from "@react-navigation/native";
import { ShopScreenProps } from "../navigation/types";
import { useDispatch } from "react-redux";
import { setFilterOptions } from "../../store/ShopReducer";

const FilterOptionsScreen = () => {
  const [selectedSection, setSelectedSection] = React.useState("");
  const filterOptions = [Brands, Colors, Materials, Types, Styles, Jewelry];
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const navigator =
    useNavigation<ShopScreenProps<"FilterOptions">["navigation"]>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
        padding: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Entypo
          name="chevron-thin-left"
          size={20}
          color={darkModeSelected ? "white" : "black"}
          onPress={() => {
            navigator.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Filter Options
          </Text>
        </View>
        <Pressable
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: darkModeSelected ? "blue" : "lightblue",
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            Apply
          </Text>
        </Pressable>
      </View>
      {filterOptions.map((filterOption, index) => (
        <FilterComponent
          key={index}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          name={filterOption.name}
          filterOptions={filterOption.options}
          darkModeSelected={darkModeSelected}
        />
      ))}
    </View>
  );
};

export default FilterOptionsScreen;

const styles = StyleSheet.create({});

type Props = {
  key: number;
  selectedSection: string;
  setSelectedSection: Dispatch<SetStateAction<string>>;
  name: string;
  darkModeSelected: boolean;
  filterOptions: string[];
};

const FilterComponent = ({
  selectedSection,
  setSelectedSection,
  name,
  filterOptions,
  darkModeSelected,
}: Props) => {
  const dispatch = useDispatch();
  const selectedFilters = useAppSelector((state) => state.shop.filterOptions);

  //animation for expanding and collapsing filter options
  const filterAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(filterAnimation, {
      toValue: selectedSection === name ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selectedSection]);

  const heightInterpolation = filterAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 450],
  });

  const handleOptionPress = (option: string) => {
    const filterOptionsToSet = selectedFilters.includes(option)
      ? selectedFilters.filter((filterToKeep) => filterToKeep !== option)
      : [...selectedFilters, option];
    console.log(filterOptionsToSet);
    dispatch(setFilterOptions(filterOptionsToSet));
  };

  return (
    <Pressable
      onPress={() => {
        name !== selectedSection
          ? setSelectedSection(name)
          : setSelectedSection("");
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginVertical: 10,
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {name}
          </Text>
          <Entypo
            name="chevron-thin-right"
            size={18}
            color={darkModeSelected ? "white" : "black"}
            style={{
              transform: [
                {
                  rotate: selectedSection === name ? "90deg" : "0deg",
                },
              ],
            }}
          />
        </View>
        <Animated.View
          style={{
            height: heightInterpolation,
            overflow: "hidden",
          }}
        >
          {filterOptions.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleOptionPress(option)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 30,
              }}
            >
              <MaterialCommunityIcons
                name={
                  selectedFilters?.includes(option)
                    ? "checkbox-marked"
                    : "checkbox-blank-outline"
                }
                size={24}
                color={selectedFilters?.includes(option) ? "blue" : "black"}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginVertical: 5,
                  color: darkModeSelected ? "white" : "black",
                  marginLeft: 10,
                  textAlign: "center",
                }}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </Pressable>
  );
};
