import React from "react";
import { View, StyleSheet } from "react-native";

import { SvgUri } from "react-native-svg";
import env from "@src/config/@env";

const Avatar = ({ seed, size = "md" }) => {
  const sizeStyle = {};
  if (size === "sm") {
    sizeStyle["width"] = 32;
    sizeStyle["height"] = 32;
    sizeStyle["marginRight"] = -10;
  }

  if (size === "lg") {
    sizeStyle["width"] = 64;
    sizeStyle["height"] = 64;
  }

  if (size == "md") {
    sizeStyle["marginRight"] = 10;
  }

  return (
    <View style={[styles.avatar, sizeStyle]}>
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
    backgroundColor: "#fff",
    borderColor: "#d1d1d1",
  },
});

export default Avatar;
