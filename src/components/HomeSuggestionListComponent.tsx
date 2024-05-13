import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SuggestionItemComponent from "./SuggestionItemComponent";

type Props = {
  images: any[];
  title: string;
};

const HomeSuggestionListComponent = ({ images, title }: Props) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          margin: 10,
          top: 5,
          left: 5,
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
