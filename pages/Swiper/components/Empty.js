import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "native-base";
import LottieView from "lottie-react-native";
const { width } = Dimensions.get("window");

const Empty = () => {
  const [seconds, setSecounds] = useState(30 * 60 - 1);
  const time = new Date(seconds * 1000).toISOString().substr(11, 8);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecounds((seconds) => {
        return seconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rest Time...</Text>
      <LottieView
        style={styles.animation}
        source={require("../../../assets/yoga.json")}
        autoPlay
        loop
      />
      <Text style={styles.time}>{time}</Text>
      <Text> remaining to new quotes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    position: "relative",
    width: width,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    width: width,
    marginLeft: 16,
    borderRadius: 50,
    alignItems: "center",
  },

  heading: {
    fontWeight: "bold",
  },

  time: {
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default Empty;
