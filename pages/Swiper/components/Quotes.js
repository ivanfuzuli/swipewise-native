import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

import Footer from "./Footer";
import Empty from "./Empty";

import Interactable from "./Interactable";
import Card from "./Card";
import Header from "./Header";

const { Value, interpolateNode, concat } = Animated;
const { width, height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);

export default class Quotes extends React.PureComponent {
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

    const quote = quotes[index];
    const nextQuote = index < quotes.length ? quotes[index + 1] : null;
    const isEmpty = quotes.length === index;

    const rotateZ = concat(
      interpolateNode(x, {
        inputRange: [-1 * deltaX, deltaX],
        outputRange: [α, -1 * α],
        extrapolate: "clamp",
      }),
      "rad"
    );
    const likeOpacity = interpolateNode(x, {
      inputRange: [0, deltaX / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolateNode(x, {
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
        <Header quote={quote} isEmpty={isEmpty} />
        <View style={styles.cards}>
          {nextQuote ? (
            <View style={styles.placeholder}>
              <Card quote={nextQuote} />
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
                <Card {...{ quote, likeOpacity, nopeOpacity }} />
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
  cards: {
    flex: 1,
    flexGrow: 8,
    width: w,
    marginLeft: 16,
    alignItems: "center",
  },
});
