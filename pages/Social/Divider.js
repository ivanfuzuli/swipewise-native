import React from "react";
import { Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";

const Divider = () => {
  return (
    <View style={styles.or}>
      <View style={styles.hr}></View>
      <View>
        <Text style={styles.orText}>or</Text>
      </View>
      <View style={styles.hr}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#d1d1d1",
    borderBottomWidth: 1,
    height: 1,
    flexGrow: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  or: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  orText: {
    color: "#000",
  },
});

export default Divider;
