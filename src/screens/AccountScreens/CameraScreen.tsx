import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SettingsScreenProps } from "../../navigation/types";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { CameraView, useCameraPermissions } from "expo-camera";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [frontView, setFrontView] = useState(CameraType.front);
  const [zoom, setZoom] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);

  const navigator =
    useNavigation<SettingsScreenProps<"Camera">["navigation"]>();

  //used to check if the screen is focused to load or unload camera
  const isFocused = useIsFocused();

  const cameraRef = useRef<CameraView>(null);

  const handleView = () => {
    if (frontView === CameraType.front) {
      setFrontView(CameraType.back);
    } else {
      setFrontView(CameraType.front);
    }
  };

  const handleTakePicture = async () => {
    if (!cameraReady) {
      return;
    }
    const newPicture = await cameraRef.current.takePictureAsync();
    //set up route to CameraConfirmationScreen, then navigate there. Set picture as param and show it there with a confirmation/retry button. On confirmation, write image to storage and set it as profile picture, then navigate back to profile screen.
    navigator.pop();
    navigator.navigate("CameraConfirmation", { picture: newPicture });
  };

  const handleZoomIn = () => {
    if (zoom < 1) {
      setZoom(zoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0) {
      setZoom(zoom - 0.1);
    }
  };

  const handleRequestPermissions = async () => {
    await requestPermission();
  };

  if (!permission || !isFocused) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera and microphone
        </Text>
        <Button onPress={handleRequestPermissions} title="Grant permission" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={frontView}
        zoom={zoom}
        autofocus="on"
        flash="on"
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.buttonContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                {
                  marginLeft: 40,
                },
              ]}
              onPress={handleTakePicture}
            >
              <MaterialIcons name="photo-camera" size={50} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.1,
            }}
          >
            <View
              style={{
                flex: 0.9,
              }}
            >
              <TouchableOpacity style={styles.button} onPress={handleView}>
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={30}
                  color="white"
                  style={{
                    top: 10,
                    right: 10,
                    transform: [
                      {
                        scaleX: frontView === CameraType.front ? 1 : -1,
                      },
                    ],
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.2,
                right: 10,
              }}
            >
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={handleZoomIn}
              >
                <Feather name="zoom-in" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={handleZoomOut}
              >
                <Feather name="zoom-out" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 50,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  button: {
    flex: 0.5,
    alignItems: "center",
  },
  zoomButton: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});
