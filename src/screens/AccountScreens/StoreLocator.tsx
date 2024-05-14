import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../../store/Selector";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

const StoreLocator = () => {
  const navigation = useNavigation();

  //Ask permission to use location
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [geoLocation, setGeoLocation] = useState<Location.LocationObject>();
  const storeLocations = useAppSelector(
    (state) => state.navigation.storeLocations
  );

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;
    (async () => {
      try {
        // Get the current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setGeoLocation(location);
      } catch (error) {
        console.log(error);
      }
    })();
    // Cleanup callback
    return () => locationSubscription && locationSubscription.remove();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 60,
          width: "80%",
          top: 40,
          left: 10,
          backgroundColor: "white",
          opacity: 0.9,
          zIndex: 1,
          elevation: 5,
          justifyContent: "center",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <TextInput
          style={{
            opacity: 0.9,
            width: "100%",
            textAlign: "center",
            fontSize: 14,
          }}
          placeholder="Enter your location"
          autoComplete="street-address"
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <MapView
          provider="google"
          style={{ flex: 1 }}
          followsUserLocation
          showsUserLocation
          region={
            geoLocation
              ? {
                  latitude: geoLocation.coords.latitude,
                  longitude: geoLocation.coords.longitude,
                  latitudeDelta: 0.1822,
                  longitudeDelta: 0.0221,
                }
              : {
                  latitude: 51.0313,
                  longitude: 3.4331,
                  latitudeDelta: 0.0822,
                  longitudeDelta: 0.0221,
                }
          }
          initialRegion={
            geoLocation
              ? {
                  latitude: geoLocation.coords.latitude,
                  longitude: geoLocation.coords.longitude,
                  latitudeDelta: 0.1822,
                  longitudeDelta: 0.0221,
                }
              : {
                  latitude: 51.0313,
                  longitude: 3.4331,
                  latitudeDelta: 0.0822,
                  longitudeDelta: 0.0221,
                }
          }
        >
          {storeLocations.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.name}
              description={store.address}
              onPress={() =>
                navigation.navigate({
                  name: "MapMarkerDetail",
                  params: { store },
                } as never)
              }
              //TODO: fix typing on this
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default StoreLocator;

const styles = StyleSheet.create({});
