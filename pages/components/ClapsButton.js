import React, { useState, useRef, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { sendClap } from "../store/votesSlice";

const MAX_CLAPS = 30;
const SEND_DEBOUNCE = 2000;
const ClapsButton = ({ quoteId, circleStyle }) => {
  const dispatch = useDispatch();

  const sendDebounced = useRef(
    debounce((quote_id, count) => {
      const vote = {
        quote_id,
        type: "clap",
        count,
      };
      dispatch(sendClap(vote));
      voteRef.current[quoteId] = 0;
    }, SEND_DEBOUNCE)
  );

  useEffect(() => {
    return () =>
      voteRef.current[quoteId] > 0 &&
      sendDebounced.current(quoteId, voteRef.current[quoteId]);
  }, []);

  const debounced = useRef(null);
  const voteRef = useRef({});

  const [count, setCount] = useState(0);

  const [isActive, setActive] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const translateAnimRef = useRef(new Animated.Value(0));

  const clapsRef = useRef(null);
  const timeout = useRef(null);

  const start = (quoteId) => {
    setActive(true);
    Animated.timing(translateAnimRef.current, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        sendDebounced.current(quoteId, voteRef.current[quoteId]);
        setActive(false);
        translateAnimRef.current.setValue(0);
      }
    });
  };

  useEffect(() => {
    setDisabled(true);
    const timer = setTimeout(() => {
      setDisabled(false);
      setCount(0);
      voteRef.current[quoteId] = 0;
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [quoteId]);

  const claps = () => {
    if (count < MAX_CLAPS) {
      setCount((state) => {
        const count = state + 1;
        voteRef.current[quoteId] = count;
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
        debounced.current = debounce((id) => start(id), 1000);
      }

      debounced.current(quoteId);
      return;
    }
    start(quoteId);
  };

  return (
    <View>
      {isDisabled && <View style={styles.disabled}></View>}
      <Pressable onPress={claps}>
        <View style={circleStyle}>
          <LottieView
            ref={clapsRef}
            style={{
              width: 48,
              height: 48,
            }}
            source={require("@src/assets/clap-yellow.json")}
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
  disabled: {
    position: "absolute",
    zIndex: 2,
    elevation: 2,
    ...StyleSheet.absoluteFillObject,
  },
  bubbleText: {
    color: "#fff",
    fontSize: 16,
    margin: 5,
  },
  container: {
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        translateY: 0,
      },
    ],
    position: "absolute",
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
