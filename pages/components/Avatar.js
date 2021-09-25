import React from "react";
import { View, StyleSheet } from "react-native";

import { SvgUri } from "react-native-svg";
import env from "@src/config/@env";

const Avatar = ({ seed }) => {
  return (
    <View style={styles.avatar}>
      <SvgUri width="100%" height="100%" uri={`${env.apiUrl}/avatar/${seed}`} />
    </View>
  );
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

export default Avatar;
