import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";

const Selected = ({ items }) => {
  return (
    <View>
      <Text style={styles.title}>Selected books.</Text>
      <View style={styles.box}>
        <Text>1.</Text>
      </View>
      <View style={styles.box}>
        <Text>2.</Text>
      </View>
      <View style={styles.box}>
        <Text>3.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  box: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
  },
});

export default Selected;
