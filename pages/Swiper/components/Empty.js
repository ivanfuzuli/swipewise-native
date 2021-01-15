import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "native-base";
import { Video } from "expo-av";
const { width } = Dimensions.get("window");

const Empty = () => {
  const [seconds, setSecounds] = useState(24 * 60 * 60 * 60 - 1);
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
      <Video
        source={require("../../../assets/yoga.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: width / 1.5, height: width / 1.5 }}
      />
      <Text style={styles.time}>{time}</Text>
      <Text> remaining to new quotes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
