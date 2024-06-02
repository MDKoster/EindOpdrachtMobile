import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { auth } from "../../config/firebase";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [frontView, setFrontView] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [cameraReady, setCameraReady] = useState(false);

  //used to check if the screen is focused to load or unload camera
  const isFocused = useIsFocused();

  const cameraRef = useRef<CameraView>(null);

  const handleView = () => {
    if (frontView === CameraType.back) {
      setFrontView(CameraType.front);
    } else {
      setFrontView(CameraType.back);
    }
  };

  const handleTakePicture = async () => {
    if (!cameraReady) {
      return;
    }
    const picture = await cameraRef.current.takePictureAsync();
    setPicture(picture);
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

  if (!permission || !isFocused) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
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
        animateShutter
        autofocus="on"
        flash="auto"
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
                      { scaleX: frontView === CameraType.back ? 1 : -1 },
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
      <View
        style={{
          flex: 0.4,
        }}
      >
        {picture && (
          <Image
            source={{ uri: picture.uri }}
            style={{ width: "100%", height: 350, marginTop: 10 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
