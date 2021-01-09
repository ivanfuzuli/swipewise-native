import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Container, View, Text, Button } from "native-base";

const Landing = ({ navigation }) => {
  return (
    <Container>
      <LinearGradient
        // Background Linear Gradient
        colors={["#f1f1f1", "#fff"]}
        style={styles.gradient}
      >
        <Text style={styles.heading}>Swipewise</Text>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("Swipe")}
            bordered
            full
            rounded
            large
            primary
          >
            <Text>Sign Up</Text>
          </Button>
          <Button style={styles.button} bordered full rounded primary>
            <Text>Login</Text>
          </Button>
        </View>
      </LinearGradient>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 10,
  },
  button: {
    margin: 10,
  },
  gradient: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    color: "#6381f0",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Landing;
