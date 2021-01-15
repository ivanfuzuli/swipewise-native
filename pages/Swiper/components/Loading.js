import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text, Container } from "native-base";
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
    <Container>
      <View style={styles.container}>
        <Text style={styles.heading}>Preparing...</Text>
        <Video
          source={require("../../../assets/preparing.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: width / 1.1, height: width / 1.1 }}
        />
        <Text style={styles.center}>
          Preparing quotes based on your favourite books.
        </Text>
        <Text style={styles.center}>This could be take a while.</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
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

export default Empty;
