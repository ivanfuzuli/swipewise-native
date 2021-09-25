import React from "react";
import { View, StyleSheet } from "react-native";

const AvatarPlaceholder = () => {
  return <View style={styles.avatar}></View>;
};

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    padding: 4,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#d1d1d1d1",
    borderColor: "#d1d1d1",
    marginRight: 10,
  },
});
export default AvatarPlaceholder;
