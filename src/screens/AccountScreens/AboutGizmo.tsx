import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";

const AboutGizmo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>About Gizmo</Text>
        <Text style={styles.description}>
          Welcome to Gizmo, your ultimate destination for trendy fashion and
          stylish clothing! Founded in 2010 by fashion enthusiasts who wanted to
          revolutionize the way people shop for clothing, Gizmo has quickly
          grown into one of the most beloved fashion brands globally.
        </Text>
        <View style={styles.paragraph}>
          <Text style={styles.innerDescription}>
            At Gizmo, we believe that fashion is not just about clothing; it's a
            form of self-expression. That's why we're committed to offering a
            diverse range of high-quality apparel that caters to all styles and
            preferences.
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
            personalities through fashion while making a positive impact on the
            planet. Whether you're a trendsetter, a minimalist, or somewhere in
            between, Gizmo has something for everyone.
          </Text>
        </View>
        <Text style={styles.description}>
          Join the Gizmo family today and discover the joy of fashion that's
          both stylish and sustainable. Thank you for choosing Gizmo – where
          fashion meets conscience.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    flexDirection: "row",
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    width: "100%",
  },
  innerDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    width: "45%",
  },
});

export default AboutGizmo;
