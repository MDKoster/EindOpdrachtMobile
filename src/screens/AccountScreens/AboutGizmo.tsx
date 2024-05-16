import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useAppSelector } from "../../../store/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../assets/colors";

const AboutGizmo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginBottom: 50,
          padding: 10,
          backgroundColor: darkModeSelected
            ? darkModeBackgroundColor
            : lightModeBackgroundColor,
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
        }}
      >
        <View style={{ flex: 1, zIndex: -1, alignItems: "center" }}>
          <Image
            style={{
              position: "absolute",
              width: "100%",
              height: 350,
              top: 140,
            }}
            source={require("../../../assets/images/open-sign.jpg")}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>About Gizmo</Text>
          <Text style={styles.description}>
            Welcome to Gizmo, your ultimate destination for trendy fashion and
            stylish clothing! Founded in 2010 by fashion enthusiasts who wanted
            to revolutionize the way people shop for clothing, Gizmo has quickly
            grown into one of the most beloved fashion brands globally.
          </Text>
          <View style={styles.paragraph}>
            <Text style={styles.innerDescription}>
              At Gizmo, we believe that fashion is not just about clothing; it's
              a form of self-expression. That's why we're committed to offering
              a diverse range of high-quality apparel that caters to all styles
              and preferences.
            </Text>
            <Image
              source={require("../../../assets/images/tshirt-about.jpg")}
              style={{
                width: "50%",
                height: 260,
                marginLeft: 10,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              height: 100,
              width: "100%",
            }}
          ></View>
          <Text style={styles.description}>
            What sets Gizmo apart is our dedication to innovation and
            sustainability. We strive to stay ahead of the curve by constantly
            exploring new trends and materials while ensuring that our
            manufacturing processes are eco-friendly and ethical.
          </Text>
          <View style={styles.paragraph}>
            <Image
              source={require("../../../assets/images/hatdog.jpg")}
              style={{ width: "50%", height: 280, marginRight: 10 }}
            />
            <Text style={styles.innerDescription}>
              Our mission is simple: to empower people to express their unique
              personalities through fashion while making a positive impact on
              the planet. Whether you're a trendsetter, a minimalist, or
              somewhere in between, Gizmo has something for everyone.
            </Text>
          </View>
          <Text style={styles.description}>
            Join the Gizmo family today and discover the joy of fashion that's
            both stylish and sustainable. Thank you for choosing Gizmo – where
            fashion meets conscience.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const darkModeSelected = () => {
  return useAppSelector((state) => state.image.darkMode);
};

const styles = StyleSheet.create({
  paragraph: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: darkModeSelected
      ? darkModeBackgroundColor
      : lightModeBackgroundColor,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: darkModeSelected
      ? darkModeBackgroundColor
      : lightModeBackgroundColor,
  },
  title: {
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "bold",
    paddingVertical: 8,
    textAlign: "center",
    backgroundColor: darkModeSelected
      ? darkModeBackgroundColor
      : lightModeBackgroundColor,
    color: darkModeSelected ? "white" : "black",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 40,
    width: "100%",
    backgroundColor: darkModeSelected
      ? darkModeBackgroundColor
      : lightModeBackgroundColor,
    color: darkModeSelected ? "white" : "black",
  },
  innerDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    width: "45%",
    color: darkModeSelected ? "white" : "black",
  },
});

export default AboutGizmo;
