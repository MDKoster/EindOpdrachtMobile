import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SuggestionItemComponent from "./SuggestionItemComponent";
import { useAppSelector } from "../../store/Selector";

type Props = {
  images: ImageSourcePropType[];
  title: string;
};

const HomeSuggestionListComponent = ({ images, title }: Props) => {
  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          margin: 10,
          top: 5,
          left: 5,
          color: darkModeSelected ? "white" : "black",
        }}
      >
        {title}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item, index }) => (
          <SuggestionItemComponent key={index} item={item} />
        )}
        keyExtractor={(index) => index.toString()}
      />
    </View>
  );
};

export default HomeSuggestionListComponent;

const styles = StyleSheet.create({});
