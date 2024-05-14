import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const MapMarkerDetailScreen = () => {
  const route: {
    key: string;
    name: string;
    params: {
      store: {
        id: string;
        name: string;
        address: string;
        phone: string;
        image: ImageSourcePropType;
        openingHours: string[];
        latitude: number;
        longitude: number;
      };
    };
  } = useRoute();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 50,
        backgroundColor: "transparent",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "400",
        }}
      >
        {route.params?.store.name}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
        }}
      >
        {route.params?.store.address}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
        }}
      >
        {route.params?.store.phone}
      </Text>
      <View
        style={{
          flex: 0.6,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={route.params?.store.image}
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
          }}
        >
          Openingsuren
        </Text>
        {route.params?.store.openingHours.map((hour, index) => (
          <Text
            key={index}
            style={{
              fontSize: 14,
              fontWeight: "300",
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
