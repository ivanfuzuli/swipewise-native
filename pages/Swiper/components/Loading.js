import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text, Container } from "native-base";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const Loading = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.heading}>Preparing...</Text>

        <LottieView
          style={styles.animation}
          source={require("../../../assets/preparing.json")}
          autoPlay
          loop
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
