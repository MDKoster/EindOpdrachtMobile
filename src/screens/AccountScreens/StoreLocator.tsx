import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useAppSelector } from "../../hooks/Selector";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import {
  SettingsStackParamsList,
  StoreLocationType,
} from "../../navigation/types";
import MapCustomStyle from "../../../util/MapCustomStyle";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setStoreLocations } from "../../../store/NavigationReducer";

const StoreLocator = () => {
  const navigation = useNavigation();
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);
  const mapDarkMode = MapCustomStyle();
  const dispatch = useDispatch();

  //Ask permission to use location
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [geoLocation, setGeoLocation] = useState<Location.LocationObject>(null);
  const storeLocations = useAppSelector(
    (state) => state.navigation.storeLocations
  );
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
    // Cleanup callback
    return () => locationSubscription && locationSubscription.remove();
  }, [status]);

  useEffect(() => {
    if (storeLocations.length > 0) return;
    const q = query(collection(db, "stores"));

    (async () => {
      try {
        const qs = await getDocs(q);
        dispatch(
          setStoreLocations(
            qs.docs.map(
              (ds) => ({ id: ds.id, ...ds.data() } as StoreLocationType)
            )
          )
        );
      } catch (error) {
        console.log(error);
      }
    })();
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
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          opacity: darkModeSelected ? 0.7 : 0.9,
          zIndex: 1,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
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
            color: darkModeSelected ? "white" : "black",
          }}
          keyboardAppearance={darkModeSelected ? "dark" : "default"}
          placeholder="Enter your location"
          placeholderTextColor={darkModeSelected ? "white" : "black"}
          autoComplete="street-address"
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: darkModeSelected ? "white" : "black",
              }}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <MapView
            provider="google"
            style={{ flex: 1 }}
            followsUserLocation
            customMapStyle={darkModeSelected ? mapDarkMode : []}
            showsUserLocation
            region={{
              latitude: geoLocation.coords.latitude,
              longitude: geoLocation.coords.longitude,
              latitudeDelta: 0.1822,
              longitudeDelta: 0.0221,
            }}
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
                  navigation.navigate<keyof SettingsStackParamsList>(
                    "MapMarkerDetail",
                    {
                      store,
                    }
                  )
                }
              />
            ))}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StoreLocator;

const styles = StyleSheet.create({});
