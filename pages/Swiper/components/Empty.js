import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "native-base";
import { Video } from "expo-av";
const { width } = Dimensions.get("window");

const Empty = ({ item }) => {
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
        style={{ width: width / 1.1, height: width / 1.1 }}
      />
      <Text>{time}</Text>
      <Text> remaining to new quotes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    flexGrow: 2,
    width: width,
    marginLeft: 16,
    borderRadius: 50,
    alignItems: "center",
  },

  heading: {
    fontWeight: "bold",
  },
});

export default Empty;
