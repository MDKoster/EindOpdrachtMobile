import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useAppSelector } from "../../hooks/Selector";
import {
  darkModeBackgroundColor,
  lightModeBackgroundColor,
} from "../../../util/colors";

const Sustainability = () => {
  const darkModeSelected = useAppSelector((state) => state.layout.darkMode);

  const styles = getStyles(darkModeSelected);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          marginVertical: 20,
          padding: 10,
          backgroundColor: darkModeSelected ? "#18191A" : "white",
          elevation: 5,
          shadowColor: darkModeSelected ? "white" : "black",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Sustainability and Gizmo</Text>
          <Text style={styles.description}>
            Welcome to Gizmo, your ultimate destination for trendy fashion and
            stylish clothing! Founded in 2010 by fashion enthusiasts who wanted
            to revolutionize the way people shop for clothing, Gizmo has quickly
            grown into one of the most beloved fashion brands globally.
          </Text>
          <Text style={styles.description}>
            At Gizmo, sustainability is at the core of everything we do. From
            sourcing materials to manufacturing processes and packaging, we're
            committed to reducing our environmental footprint at every step of
            the way.
          </Text>
          <Text style={styles.description}>
            One of our key sustainability efforts is sourcing materials from
            eco-friendly suppliers. We prioritize organic cotton, recycled
            polyester, and other sustainable fabrics to minimize the impact on
            the environment.
          </Text>
          <Text style={styles.description}>
            In our manufacturing processes, we've implemented energy-efficient
            technologies and reduced water consumption. By investing in
            renewable energy and optimizing production lines, we've
            significantly decreased our carbon emissions.
          </Text>
          <Text style={styles.description}>
            Additionally, we're proud to offer a range of sustainable fashion
            lines made from organic cotton, recycled materials, and eco-friendly
            dyes. These initiatives have not only improved sustainability but
            also resonated with our environmentally conscious customers.
          </Text>
          <Text style={styles.description}>
            Looking ahead, we're committed to further enhancing our
            sustainability efforts. Our future plans include investing in
            innovative recycling technologies, exploring alternative packaging
            solutions, and collaborating with like-minded organizations to drive
            positive change in the fashion industry.
          </Text>
          <Text style={styles.description}>
            Our mission is simple: to empower people to express their unique
            personalities through fashion while making a positive impact on the
            planet. Whether you're a trendsetter, a minimalist, or somewhere in
            between, Gizmo has something for everyone.
          </Text>
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

const getStyles = (darkModeSelected: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingBottom: 50,
      backgroundColor: darkModeSelected
        ? darkModeBackgroundColor
        : lightModeBackgroundColor,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
      textAlign: "center",
      color: darkModeSelected ? "#fff" : "#000",
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 20,
      color: darkModeSelected ? "#fff" : "#000",
    },
  });

export default Sustainability;
