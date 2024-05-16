import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../assets/colors";

type Props = {
  item: ImageSourcePropType;
};

const SuggestionItemComponent = ({ item }: Props) => {
  const navigator = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigator.navigate({
            name: "ShopStack",
            params: { item: item },
          } as never);
        }}
      >
        <Image source={item} style={styles.cardImage} />
      </TouchableOpacity>
      <View style={styles.cardDetails}></View>
    </View>
  );
};

export default SuggestionItemComponent;

const darkModeSelected = () => {
  return useAppSelector((state) => state.image.darkMode);
};

const styles = StyleSheet.create({
  cardImage: {
    width: 130,
    height: 220,
    marginHorizontal: 10,
    marginTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 0.4,
    borderColor: darkModeSelected ? "white" : "black",
    backgroundColor: darkModeSelected
      ? darkModeBackgroundColor
      : lightModeBackgroundColor,
    elevation: 3,
    shadowColor: darkModeSelected ? "white" : "black",
  },
  cardDetails: {
    height: 50,
    width: 130,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 0.4,
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: darkModeSelected ? "#CECECE" : "white",
    elevation: 3,
    shadowColor: darkModeSelected ? "white" : "black",
  },
});
