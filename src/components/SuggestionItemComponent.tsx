import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

type Props = {
  item: ListRenderItemInfo<any>;
};

const SuggestionItemComponent = ({ item }) => {
  return (
    <>
      <Image source={item} style={styles.cardImage} />
      <View style={styles.cardDetails}></View>
    </>
  );
};

export default SuggestionItemComponent;

const styles = StyleSheet.create({
  cardImage: {
    width: 130,
    height: 220,
    marginHorizontal: 10,
    marginTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 0.4,
    borderColor: "black",
    backgroundColor: "white",
    elevation: 3,
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
    backgroundColor: "white",
    elevation: 3,
  },
});
