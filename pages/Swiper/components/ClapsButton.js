import React, { useState, useRef } from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import debounce from "lodash/debounce";

const MAX_CLAPS = 30;
const ClapsButton = ({ circle }) => {
  const debounced = useRef(null);
  const [count, setCount] = useState(0);
  const [isActive, setActive] = useState(false);
  const translateAnimRef = useRef(new Animated.Value(0));

  const clapsRef = useRef(null);
  const timeout = useRef(null);

  const start = () => {
    setActive(true);
    Animated.timing(translateAnimRef.current, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setActive(false);
        translateAnimRef.current.setValue(0);
      }
    });
  };

  const claps = () => {
    if (count < MAX_CLAPS) {
      setCount((state) => state + 1);
    }
    clapsRef.current.play();
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      clapsRef.current && clapsRef.current.reset();
    }, 600);

    if (isActive) {
      translateAnimRef.current.stopAnimation(
        (step) => (translateAnimRef.current = new Animated.Value(step))
      );

      if (!debounced.current) {
        debounced.current = debounce(start, 1000);
      }

      debounced.current();
      return;
    }

    start();
  };
  return (
    <View>
      <Pressable onPress={claps}>
        <View style={circle}>
          <LottieView
            ref={clapsRef}
            style={{
              width: 48,
              height: 48,
            }}
            source={require("../../../assets/clap-yellow.json")}
          />
        </View>
      </Pressable>
      <Animated.View
        style={[
          styles.bubble,
          {
            display: isActive ? "flex" : "none",
            opacity: translateAnimRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, -1],
            }),
            transform: [
              {
                translateY: translateAnimRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-40, -180],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.bubbleText}>+{count}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleText: {
    color: "#fff",
    fontSize: 16,
    margin: 5,
  },
  bubble: {
    transform: [
      {
        translateY: 0,
      },
    ],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,

    right: 10,
    height: 42,
    width: 42,
    position: "absolute",
    backgroundColor: "#000",
  },
});
export default ClapsButton;
