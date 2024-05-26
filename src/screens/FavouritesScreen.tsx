import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../util/colors";
import { useDispatch } from "react-redux";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { item } from "../navigation/types";
import { setFavorites } from "../../store/UserReducer";
import ItemListComponent from "../components/ItemListComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const FavouritesScreen = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const favorites = useAppSelector((state) => state.user.favorites);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, `users/${auth.currentUser.uid}/favorites`));

    const unsubscribe = onSnapshot(q, (qs) => {
      dispatch(
        setFavorites(qs.docs.map((ds) => ({ id: ds.id, ...ds.data() } as item)))
      );
    });

    return unsubscribe;
  }, [auth.currentUser]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
        paddingBottom: 50,
      }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
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
            MY FAVOURITES
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: darkModeSelected
              ? darkModeBackgroundColor
              : lightModeBackgroundColor,
            alignItems: "center",
          }}
        >
          {favorites == null ? (
            <Text
              style={{
                fontSize: 20,
                top: 20,
                color: darkModeSelected ? "white" : "black",
              }}
            >
              You have no favourites yet.
            </Text>
          ) : (
            <FlatList
              numColumns={2}
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ItemListComponent key={item.id} item={item} />
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
