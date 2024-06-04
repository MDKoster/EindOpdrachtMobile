import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SettingsScreenProps } from "../../navigation/types";
import { auth, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const CameraConfirmationScreen = () => {
  const {
    params: { picture },
  } = useRoute<SettingsScreenProps<"CameraConfirmation">["route"]>();
  const navigator = useNavigation();

  const handleSetProfilePicture = async () => {
    if (!picture.uri) return;

    //uri uit image halen
    const response = await fetch(picture.uri);
    //blob maken
    const blob = await response.blob();
    //filename en locatie instellen
    const filename =
      "profilepictures/" +
      auth.currentUser?.uid +
      picture.uri.substring(picture.uri.lastIndexOf("/") + 1);

    //storage ref maken, m.a.w. waar en onder welke naam moet het bestand worden opgeslagen
    const storageRef = ref(storage, filename);
    //upload task definiëren, m.a.w. wat geupload moet worden + storageRef
    const uploadTask = uploadBytesResumable(storageRef, blob);

    //upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          `${snapshot.bytesTransferred} bytes transferred out of ${snapshot.totalBytes}`
        );
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        //URL ophalen om in te stellen als profielafbeelding
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("Image uploaded to Firebase Storage at", downloadURL);

        //stel in als profielafbeelding
        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, {
            photoURL: downloadURL,
          });
        } else {
          console.error("No user is logged in");
        }
      }
    );
    navigator.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: picture.uri }} style={{ flex: 1 }} />
      <Text style={{ textAlign: "center" }}>Use this profile picture?</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            borderRadius: 5,
            width: "40%",
            height: 50,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleSetProfilePicture} //write image to storage and set it as profile picture
        >
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            borderRadius: 5,
            width: "40%",
            height: 50,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Text>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraConfirmationScreen;

const styles = StyleSheet.create({});
