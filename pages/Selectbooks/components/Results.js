import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Text } from "native-base";
import { addBook } from "../store/selectedSlice";
const Results = ({ blurSearchInput }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.selected.books);
  const searchValue = useSelector((state) => state.selected.searchValue);

  const handleAddBook = (book) => {
    blurSearchInput();
    dispatch(addBook(book));
  };
  return (
    <View style={styles.container}>
      {!!searchValue &&
        books.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => handleAddBook(item)}
              style={styles.itemContainer}
            >
              <Text style={styles.heading}>{item.title}</Text>
              <Text style={styles.text}>by {item.author.name}</Text>
            </TouchableOpacity>
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
