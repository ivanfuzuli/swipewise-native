import React from "react";

import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorHeading}>Error:</Text>
      <Text style={styles.errorWhite}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    borderColor: "red",
    backgroundColor: "#f9461c",
    margin: 10,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  errorWhite: {
    padding: 5,
    color: "white",
  },

  errorHeading: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ErrorMessage;