import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AboutApp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Gizmo</Text>
      <Text style={styles.description}>
        Gizmo is your go-to destination for the latest fashion trends and
        stylish clothing. With a passion for innovation and sustainability, we
        strive to offer a diverse range of high-quality apparel that caters to
        all styles and preferences.
      </Text>
      <Text style={styles.subheading}>Version History</Text>
      <Text style={styles.history}>
        - Version 1.0 (Initial Release): Introducing Gizmo – your ultimate
        fashion companion.
        {"\n"}- Version 1.1: Added new clothing categories and improved user
        interface.
        {"\n"}- Version 1.2: Enhanced performance and bug fixes for a smoother
        shopping experience.
        {"\n"}- Version 1.3: Introducing personalized recommendations and
        wishlist feature.
      </Text>
      <Text style={styles.subheading}>Contact Us</Text>
      <Text style={styles.contact}>
        Have questions, feedback, or suggestions? We'd love to hear from you!
        Reach out to us at gizmo@email.com or follow us on Instagram
        @gizmo_fashion.
      </Text>
      <Text style={styles.subheading}>Privacy Policy</Text>
      <TouchableOpacity>
        <Text style={styles.link}>
          Read our privacy policy to learn more about how we collect, use, and
          protect your personal information.
        </Text>
      </TouchableOpacity>
      <Text style={styles.subheading}>Terms of Service</Text>
      <TouchableOpacity>
        <Text style={styles.link}>
          By using the Gizmo app, you agree to our terms of service. Review our
          terms for important information about your rights and
          responsibilities.
        </Text>
      </TouchableOpacity>
      <Text style={styles.subheading}>App Version</Text>
      <Text style={styles.version}>
        Current Version: 1.3 (Build 123456) - Updated January 2024
      </Text>
      <Text style={styles.subheading}>Credits</Text>
      <Text style={styles.credits}>
        Gizmo wouldn't be possible without the hard work and dedication of our
        development team. Special thanks to our designers, developers, and
        testers for their contributions.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  history: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  contact: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  version: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  credits: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AboutApp;
