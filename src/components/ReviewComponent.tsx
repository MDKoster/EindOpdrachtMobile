import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Review } from "../navigation/types";
import { FontAwesome } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";

type Props = {
  key: string;
  review: Review;
};

const ReviewComponent = ({ review }: Props) => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        margin: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{review.userName}</Text>
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          {[...Array(review.score / 10)].map((e, index) => (
            <FontAwesome key={index} name="star" size={24} color="gold" />
          ))}
          {[...Array(5 - review.score / 10)].map((e, index) => (
            <FontAwesome
              key={index}
              name="star-o"
              size={24}
              color="lightgrey"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewStyle}>{review.review}</Text>
      <Text style={styles.dateStyle}>{review.date}</Text>
    </View>
  );
};

export default ReviewComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "500",
    margin: 5,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    margin: 5,
    marginVertical: 20,
  },
  reviewStyle: {
    fontSize: 14,
    fontWeight: "300",
    margin: 5,
  },
  dateStyle: {
    fontSize: 12,
    fontWeight: "300",
    margin: 5,
    color: "grey",
  },
});
