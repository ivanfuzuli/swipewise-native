import React from "react";
import {
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Container, View, Text, Button } from "native-base";
import Signup from "./Signup";

const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <ScrollView>
            <View style={styles.gradient}>
              <Pressable onPress={() => navigation.navigate("Swipe")}>
                <Text style={styles.heading}>Swipewise</Text>
              </Pressable>
              <Signup navigation={navigation} />
              <View style={styles.buttons}>
                <View>
                  <Text>Already have account? </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.termsLink}> Login </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  termsLink: {
    color: "#4991f7",
  },
  buttons: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
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
