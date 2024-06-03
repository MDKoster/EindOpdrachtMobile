import {
  Image,
  ImageSourcePropType,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SettingsScreenProps } from "../../navigation/types";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const MapMarkerDetailScreen = () => {
  const {
    params: { store },
  } = useRoute<SettingsScreenProps<"MapMarkerDetail">["route"]>();

  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 50,
        backgroundColor: darkModeSelected
          ? darkModeBackgroundColor
          : lightModeBackgroundColor,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "400",
          color: darkModeSelected ? "white" : "black",
        }}
      >
        {store.name}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          color: darkModeSelected ? "white" : "black",
        }}
      >
        {store.address}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Feather
          name="phone"
          size={24}
          color={darkModeSelected ? "gold" : "blue"}
          style={{
            paddingRight: 15,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            color: darkModeSelected ? "gold" : "blue",
          }}
          onPress={() => {
            Linking.openURL(`tel:${store.phone}`);
          }}
        >
          {store.phone}
        </Text>
      </View>
      <View
        style={{
          flex: 0.6,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          src={store.image}
          style={{
            borderWidth: 2,
            borderColor: "black",
            width: "95%",
            height: "100%",
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          width: "50%",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: darkModeSelected ? "white" : "black",
          }}
        >
          Openingsuren
        </Text>
        <FlatList
          keyExtractor={(index) => index.toString()}
          data={store.openingHours}
          renderItem={({ item }) => (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                color: darkModeSelected ? "white" : "black",
              }}
            >
              {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default MapMarkerDetailScreen;

const styles = StyleSheet.create({});
