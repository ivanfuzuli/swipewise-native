import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Selected = () => {
  const selectedBooks = useSelector((state) => state.selected.selectedBooks);

  return (
    <View>
      <Text style={styles.title}>
        Please search and select most favourite three books.
      </Text>
      {selectedBooks.length > 0 &&
        selectedBooks.map((book, index) => {
          return (
            <View style={styles.box}>
              <View style={styles.number}>
                <Text>{index + 1}</Text>
              </View>
              <Text>
                {book.title} by {book.author.name}
              </Text>
              <View>
                <MaterialIcons name="clear" size={36} color="red" />
              </View>
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
  number: {
    backgroundColor: "#f0f2f5",
    fontWeight: "bold",
    padding: 15,
    marginRight: 10,
    borderRadius: 50,
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
});

export default Selected;
