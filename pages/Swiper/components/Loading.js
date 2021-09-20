import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Text, Button } from "react-native-elements";
import LottieView from "lottie-react-native";

import { useDispatch } from "react-redux";
import { getQuotes } from "../../store/statusSlice";

const RETRY_VISIBILITY_AFTER_SEC = 10;
const RETRY_MODAL_VISIBILITY_IN_SEC = 5;

const { width } = Dimensions.get("window");
const Loading = () => {
  const [extraLoading, setExtraLoading] = useState(false);
  const [retry, setRetry] = useState(false);
  const timeoutRef = useRef(null);
  const retryRef = useRef(null);

  const dispatch = useDispatch();
  const handleOpenLoading = () => {
    setExtraLoading(true);
    dispatch(getQuotes());
    timeoutRef.current = setTimeout(() => {
      setExtraLoading(false);
    }, RETRY_MODAL_VISIBILITY_IN_SEC * 1000);
  };

  useEffect(() => {
    retryRef.current = setTimeout(() => {
      setRetry(true);
    }, RETRY_VISIBILITY_AFTER_SEC * 1000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(retryRef.current);
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Preparing...</Text>

        <LottieView
          style={styles.animation}
          source={require("../../../assets/preparing.json")}
          autoPlay
          loop
        />
        <Text style={styles.center}>
          Preparing quotes based on your favourite genres.
        </Text>
        <Text style={styles.center}>This could be take a while.</Text>
        {retry && (
          <View style={styles.button}>
            <Button onPress={handleOpenLoading} title="Retry!"></Button>
          </View>
        )}
      </View>
      {extraLoading && (
        <View style={styles.absolute}>
          <LottieView
            style={styles.beer}
            source={require("../../../assets/beer.json")}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#3490dc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  beer: {
    width: 60,
    height: 60,
  },
  button: {
    marginTop: 10,
  },

  animation: {
    position: "relative",
    paddingLeft: 10,
    paddingRight: 10,
    height: width,
  },

  center: {
    textAlign: "center",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontWeight: "bold",
  },
});

export default Loading;
