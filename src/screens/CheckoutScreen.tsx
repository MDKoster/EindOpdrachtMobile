import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/Selector";
import ShoppingCartComponent from "../components/ShoppingCartComponent";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import CheckoutComponent from "../components/CheckoutComponent";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { emptyShoppingCart } from "../../store/UserReducer";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const shoppingCart = useAppSelector((state) => state.user.shoppingCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigator = useNavigation();

  useEffect(() => {
    if (shoppingCart) {
      setTotalPrice(
        shoppingCart
          .map((item) => item.price * item.quantity)
          .reduce((a, b) => a + b, 0) / 100
      );
    }
  }, [shoppingCart]);

  const handlePayment = async () => {
    console.log("payment made");
    try {
      const promises = shoppingCart.map(async (item) => {
        const itemRef = doc(db, "items", item.id); // Adjust the path to your Firestore collection
        await updateDoc(itemRef, {
          quantity: item.stock - item.quantity,
        });
      });

      await Promise.all(promises);

      dispatch(emptyShoppingCart());

      Alert.alert("Payment successful!", "Thank you for your purchase.", [
        {
          text: "Continue",
          onPress: () => {
            navigator.navigate("HomeStack", { screen: "Home" });
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating Firestore: ", error);
      Alert.alert("Error", "There was a problem processing your payment.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 50,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <View
        style={{
          flex: 0.06,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: darkModeSelected ? "#740000" : "#060032",
          width: "100%",
        }}
      >
        <Text
          style={{
            top: 2,
            fontSize: 32,
            fontFamily: "Exquite",
            color: "white",
          }}
        >
          CHECKOUT
        </Text>
      </View>
      <FlatList
        style={{ flex: 0.7 }}
        data={shoppingCart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CheckoutComponent item={item} />}
      />
      <View
        style={{
          flex: 0.06,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: darkModeSelected ? "#740000" : "#060032",
          width: "100%",
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Exquite",
            color: darkModeSelected ? "lightgrey" : "white",
          }}
        >
          Total: ${totalPrice}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 0.06,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00b815",
          width: "100%",
          marginBottom: 5,
        }}
        onPress={handlePayment}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Exquite",
            color: darkModeSelected ? "lightgrey" : "white",
          }}
        >
          Continue to Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
