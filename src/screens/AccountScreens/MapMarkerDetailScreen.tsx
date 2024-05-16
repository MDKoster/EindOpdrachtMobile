import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SettingsScreenProps } from "../../navigation/types";
import { useAppSelector } from "../../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../assets/colors";

const MapMarkerDetailScreen = () => {
  const {
    params: { store },
  } = useRoute<SettingsScreenProps<"MapMarkerDetail">["route"]>();

  const darkModeSelected = useAppSelector((state) => state.image.darkMode);

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
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          color: darkModeSelected ? "white" : "black",
        }}
      >
        {store.phone}
      </Text>
      <View
        style={{
          flex: 0.6,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={store.image}
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
        {store.openingHours.map((hour, index) => (
          <Text
            key={index}
            style={{
              fontSize: 14,
              fontWeight: "300",
              color: darkModeSelected ? "white" : "black",
            }}
          >
            {hour}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default MapMarkerDetailScreen;

const styles = StyleSheet.create({});
