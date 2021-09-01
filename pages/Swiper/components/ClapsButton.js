import React, { useState, useRef, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { sendClap } from "../../store/votesSlice";

const MAX_CLAPS = 30;
const SEND_DEBOUNCE = 2000;
const ClapsButton = ({ quote, circleStyle }) => {
  const dispatch = useDispatch();

  const sendDebounced = useRef(
    debounce((quote_id, count) => {
      const vote = {
        quote_id,
        type: "clap",
        count,
      };
      dispatch(sendClap(vote));
    }, SEND_DEBOUNCE)
  );

  const debounced = useRef(null);
  const quoteIdRef = useRef(null);

  const [count, setCount] = useState(0);
  const countRef = useRef(0);

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
        sendDebounced.current(quoteIdRef.current, countRef.current);
        setActive(false);
        translateAnimRef.current.setValue(0);
      }
    });
  };

  useEffect(() => {
    setCount(0);
    countRef.current = 0;
    quoteIdRef.current = quote._id;
  }, [quote._id]);

  const claps = () => {
    if (count < MAX_CLAPS) {
      setCount((state) => {
        const count = state + 1;
        countRef.current = count;
        return count;
      });
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
        <View style={circleStyle}>
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
          styles.container,
          {
            opacity: translateAnimRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, -1],
            }),
            transform: [
              {
                translateY: translateAnimRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, -180],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.bubble, { display: isActive ? "flex" : "none" }]}>
          <Text style={styles.bubbleText}>+{count}</Text>
        </View>
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
  container: {
    transform: [
      {
        translateY: 0,
      },
    ],
    position: "absolute",
    right: 10,
  },
  bubble: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 42,
    width: 42,
    backgroundColor: "#000",
  },
});
export default ClapsButton;
