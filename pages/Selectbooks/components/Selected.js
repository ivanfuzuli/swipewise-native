import React from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { removeByIndex } from "../store/selectedSlice";
const Selected = () => {
  const dispatch = useDispatch();
  const selectedBooks = useSelector((state) => state.selected.selectedBooks);

  const handleRemove = (index) => {
    dispatch(removeByIndex(index));
  };

  return (
    <View>
      {selectedBooks.length < 1 && (
        <Text style={styles.title}>
          Please search and select most favourite three books.
        </Text>
      )}
      {selectedBooks.length > 0 && (
        <View style={styles.info}>
          <Text>{selectedBooks.length}/3</Text>
        </View>
      )}
      {selectedBooks.length > 0 &&
        selectedBooks.map((book, index) => {
          return (
            <View style={styles.box}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.text}>
                <Text>
                  {book.title} by {book.author.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },

  info: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginBottom: 5,
  },

  number: {
    backgroundColor: "#f0f2f5",
    padding: 15,
    marginRight: 10,
    borderRadius: 50,
  },

  numberText: {
    fontWeight: "bold",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 50,
    backgroundColor: "white",
    padding: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
  },

  text: {
    flex: 1,
  },
});

export default Selected;
