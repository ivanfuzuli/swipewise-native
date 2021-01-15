import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text, Container } from "native-base";
import { Video } from "expo-av";
const { width } = Dimensions.get("window");

const Loading = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.heading}>Preparing...</Text>
        <Video
          source={require("../../../assets/preparing.mp4")}
          posterSource={require("../../../assets/preparing-poster.png")}
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

export default Loading;
