import React, { useMemo, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import runButtonTiming from "../animations/runButtonTiming";

const { Clock, Value } = Animated;

const Footer = ({ onChange, x }) => {
  const likeRef = useRef(null);
  const dislikeRef = useRef(null);
  const clock = useMemo(() => new Clock(), []);

  const clicked = useMemo(() => new Value(0), []);

  const transX = useMemo(
    () =>
      runButtonTiming(clock, 380, x, clicked, (x) => {
        onChange({ nativeEvent: { x } });
      }),
    []
  );
  const like = () => {
    likeRef.current.play();
    clicked.setValue(1);
    setTimeout(() => {
      likeRef.current.reset();
    }, 600);
  };

  const dislike = () => {
    dislikeRef.current.play();
    clicked.setValue(-1);
    setTimeout(() => {
      dislikeRef.current.reset();
    }, 300);
  };

  return (
    <>
      <Animated.View style={{ ...styles.footer }}>
        <View style={styles.circle}>
          <Pressable onPress={dislike}>
            <LottieView
              ref={dislikeRef}
              style={{
                width: 48,
                height: 48,
              }}
              source={require("../assets/dislike.json")}
            />
          </Pressable>
        </View>
        <View style={styles.circle}>
          <Pressable onPress={like}>
            <LottieView
              ref={likeRef}
              style={{
                width: 64,
                height: 64,
              }}
              source={require("../assets/like.json")}
            />
          </Pressable>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX: transX }],
          width: 10,
          height: 10,
          borderWidth: 1,
          borderColor: "red",
        }}
      ></Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

export default Footer;
