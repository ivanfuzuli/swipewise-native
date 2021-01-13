import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Text } from "native-base";
const Results = () => {
  const books = useSelector((state) => state.selected.books);

  return (
    <View style={styles.container}>
      {books.map((item) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.text}>by {item.author.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },
  heading: {
    fontWeight: "bold",
  },

  itemContainer: {
    borderBottomColor: "#d1d1d1",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});

export default Results;
