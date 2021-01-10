import React from "react";
import { StyleSheet } from "react-native";

import { Container, View, Text, Button } from "native-base";

const Landing = ({ navigation }) => {
  return (
    <Container>
      <View style={styles.gradient}>
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
          <Button
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
            bordered
            full
            rounded
            primary
          >
            <Text>Login</Text>
          </Button>
        </View>
      </View>
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
    color: "#fe4b00",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Landing;
