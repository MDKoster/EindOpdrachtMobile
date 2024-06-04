import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { DBitem, Review } from "../navigation/types";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

type Props = {
  id: string;
  item: DBitem;
  fetchReviews: (id: string, itemData: DBitem) => Promise<void>;
};

const ReviewInputComponent = ({ id, item, fetchReviews }: Props) => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const [review, setReview] = React.useState("");
  const [score, setScore] = React.useState(0);
  const reviewRef = useRef(null);

  const handleAddReview = async () => {
    if (auth.currentUser === null) {
      Alert.alert("Please sign in to add a review");
      return;
    }
    if (review.length > 0 && score > 0) {
      const newReview: Review = {
        userName: auth.currentUser.displayName,
        score: score * 10,
        date: new Date().toLocaleDateString(),
        review: review,
      };
      const dbReview = {
        userName: auth.currentUser.displayName,
        score: score * 10,
        date: Timestamp.fromDate(new Date()),
        review: review,
      };
      const success = addReviewToDB(dbReview);
      if (!success) {
        Alert.alert("Failed to add review");
        return;
      }
      await fetchReviews(id, item);
      setReview("");
      reviewRef.current.clear();
      setScore(0);
    }
  };

  const addReviewToDB = async (review) => {
    try {
      const collectionRef = collection(db, `items/${id}/reviews`);
      await addDoc(collectionRef, review);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
        elevation: 1,
        margin: 5,
      }}
    >
      <Text
        style={[
          styles.title,
          {
            color: darkModeSelected ? "white" : "black",
          },
        ]}
      >
        Add a review
      </Text>
      <TextInput
        ref={reviewRef}
        style={styles.textInput}
        onChangeText={(value) => setReview(value)}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.starContainer}>
          <Text
            style={[
              styles.textStyle,
              {
                color: darkModeSelected ? "white" : "black",
              },
            ]}
          >
            Add a score:{" "}
          </Text>
          {[...Array(score)].map((e, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={30}
              color="gold"
              onPress={() => setScore(index + 1)}
            />
          ))}
          {[...Array(5 - score)].map((e, index) => (
            <FontAwesome
              key={index}
              name="star-o"
              size={30}
              color="lightgrey"
              onPress={() => setScore(score + index + 1)}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleAddReview}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: darkModeSelected ? "#7359FD" : "#6B9ADD",
                borderColor: darkModeSelected ? "#E6E1FF" : "#A2C1EB",
              },
            ]}
          >
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewInputComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "500",
    margin: 5,
  },
  textInput: {
    margin: 5,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    margin: 5,
    marginVertical: 20,
  },
  button: {
    margin: 5,
    padding: 5,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    borderRadius: 2,
    borderWidth: 0.5,
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
