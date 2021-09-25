import React from "react";
import { View, StyleSheet } from "react-native";

const UsernamePlaceholder = () => {
  return <View style={styles.avatar}></View>;
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 20,
    backgroundColor: "#d1d1d1d1",
    marginRight: 10,
  },
});
export default UsernamePlaceholder;
