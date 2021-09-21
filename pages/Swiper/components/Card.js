// @flow
import * as React from "react";
import { Text } from "react-native-elements";

import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import CardContent from "./CardContent";

const style = {
  ...StyleSheet.absoluteFillObject,
  marginBottom: 10,
  flex: 1,
};

export default (props) => {
  const { quote, likeOpacity, nopeOpacity } = {
    likeOpacity: 0,
    nopeOpacity: 0,
    ...props,
  };
  return (
    <View style={style}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.nope, { opacity: nopeOpacity }]}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{quote.name}</Text>
        </View>
      </View>
      <CardContent quote={quote} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    justifyContent: "space-between",
    padding: 16,
    zIndex: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
  },
  name: {
    color: "white",
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 36,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 36,
    color: "#ec5288",
    fontWeight: "bold",
  },
});
