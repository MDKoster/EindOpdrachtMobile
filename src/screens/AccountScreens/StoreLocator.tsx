import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../../store/Selector";

const StoreLocator = () => {
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
    <View
      style={{
        flex: 1,
        margin: 10,
        justifyContent: "center",
      }}
    >
      <MapView
        provider="google"
        style={{ flex: 0.7 }}
        followsUserLocation
        showsUserLocation
        region={
          geoLocation
            ? {
                latitude: geoLocation.coords.latitude,
                longitude: geoLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
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
          />
        ))}
      </MapView>
    </View>
  );
};

export default StoreLocator;

const styles = StyleSheet.create({});
