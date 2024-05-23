import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  currentIndex: number;
  data: string[];
};

const PaginationComponent = ({ currentIndex, data }: Props) => {
  return (
    <View style={styles.pagination}>
      {data != null
        ? data.map((_, index: number) => (
            <Pressable key={index}>
              <View
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            </Pressable>
          ))
        : null}
    </View>
  );
};

export default PaginationComponent;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    bottom: 15,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "white",
  },
  inactiveDot: {
    backgroundColor: "#b0b0b0",
  },
});
