import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

import Footer from "./Footer";
import Empty from "./Empty";

import Interactable from "./Interactable";
import Card from "./Card";
import { TouchableOpacity } from "react-native-gesture-handler";

const { Value, interpolate, concat } = Animated;
const { width, height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);

export default class Profiles extends React.PureComponent {
  state = {
    index: 0,
  };

  x = new Value(0);
  y = new Value(0);

  onSnap = ({ nativeEvent: { x } }) => {
    const { index } = this.state;
    this.x.setValue(0);
    if (x !== 0) {
      this.setState({ index: index + 1 });
    }
  };

  render() {
    const { onSnap } = this;
    const { quotes } = this.props;
    const { index } = this.state;
    const x = this.x;
    const y = this.y;

    const profile = quotes[index];
    const nextProfile = index < quotes.length ? quotes[index + 1] : null;
    const isEmpty = quotes.length === index;

    const rotateZ = concat(
      interpolate(x, {
        inputRange: [-1 * deltaX, deltaX],
        outputRange: [α, -1 * α],
        extrapolate: "clamp",
      }),
      "rad"
    );
    const likeOpacity = interpolate(x, {
      inputRange: [0, deltaX / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolate(x, {
      inputRange: [(-1 * deltaX) / 4, 0],
      outputRange: [1, 0],
    });
    const translateX = x;
    const translateY = y;
    const style = {
      ...StyleSheet.absoluteFillObject,
      transform: [{ translateX }, { translateY }, { rotateZ }],
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Icon name="user" size={32} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          {nextProfile ? (
            <View style={styles.placeholder}>
              <Card profile={nextProfile} />
            </View>
          ) : (
            <Empty />
          )}
          {!isEmpty && (
            <Interactable
              key={index}
              snapPoints={[{ x: -1 * A }, { x: 0 }, { x: A }]}
              style={{ ...StyleSheet.absoluteFill, zIndex: 2 }}
              {...{ onSnap, x, y }}
            >
              <Animated.View {...{ style }}>
                <Card {...{ profile, likeOpacity, nopeOpacity }} />
              </Animated.View>
            </Interactable>
          )}
        </View>
        {!isEmpty && <Footer onChange={onSnap} x={x} y={y} />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  cards: {
    flex: 1,
    flexGrow: 8,
    width: w,
    marginLeft: 16,
    alignItems: "center",
  },
});