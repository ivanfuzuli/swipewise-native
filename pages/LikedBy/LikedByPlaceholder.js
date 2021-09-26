import React from "react";
import { View, StyleSheet } from "react-native";

const LikedByPlaceholder = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.avatar_container}>
        <View style={styles.avatar}></View>
        <View style={styles.text}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    width: 48,
    height: 13,
    flexWrap: "wrap",
    backgroundColor: "#d1d1d1",
  },

  avatar: {
    height: 64,
    width: 64,
    backgroundColor: "#d1d1d1",
    borderRadius: 50,
  },
  avatar_container: {
    width: 84,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LikedByPlaceholder;
