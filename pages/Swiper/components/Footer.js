import React, { useMemo, useEffect, useRef } from "react";
import {
  Animated as RNAnimated,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import runButtonTiming from "../../../animations/runButtonTiming";
import ClapsButton from "./ClapsButton";

const { width } = Dimensions.get("window");

const { Clock, Value } = Animated;

const Footer = ({ quote, onChange, x }) => {
  const likeRef = useRef(null);
  const timeout = useRef(null);

  const fadeAnim = useRef(new RNAnimated.Value(1)).current; // Initial value for opacity: 0

  const clock = useMemo(() => new Clock(), []);
  const clicked = useMemo(() => new Value(0), []);
  const transX = useMemo(
    () =>
      runButtonTiming(clock, width, x, clicked, (x) => {
        onChange({ nativeEvent: { x } });
      }),
    []
  );
  const like = () => {
    likeRef.current.play();
    clicked.setValue(1);

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      likeRef.current && likeRef.current.reset();
    }, 600);
  };

  const dislike = () => {
    RNAnimated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start(() => fadeAnim.setValue(1));
    clicked.setValue(-1);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);
  return (
    <>
      <Animated.View style={{ ...styles.footer }}>
        <Pressable onPress={dislike}>
          <View style={{ ...styles.circle }}>
            <RNAnimated.View style={{ transform: [{ scale: fadeAnim }] }}>
              <Icon name="x" size={32} color="#ec5288" />
            </RNAnimated.View>
          </View>
        </Pressable>
        <ClapsButton quote={quote} circleStyle={styles.circle} />
        <Pressable onPress={like}>
          <View style={styles.circle}>
            <LottieView
              ref={likeRef}
              style={{
                width: 64,
                height: 64,
              }}
              source={require("../../../assets/like.json")}
            />
          </View>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX: transX }],
          width: 10,
          height: 10,
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
    elevation: 2,
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
