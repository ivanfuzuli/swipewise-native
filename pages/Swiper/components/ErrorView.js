import React from "react";
import { useDispatch } from "react-redux";

import { StyleSheet, Dimensions } from "react-native";
import { View, Text, Container, Button } from "native-base";
import LottieView from "lottie-react-native";
import { getQuotes } from "../../store/statusSlice";

const { width } = Dimensions.get("window");

const ErrorView = () => {
  const dispatch = useDispatch();

  const handlePress = async () => {
    await dispatch(getQuotes());
  };
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.heading}>An error occured!...</Text>

        <LottieView
          style={styles.animation}
          source={require("../../../assets/error.lottie.json")}
          autoPlay
          loop
        />
        <Text style={styles.center}>
          It may be related to your internet connection.
        </Text>
        <Text style={styles.center}>
          <Button onPress={handlePress}>
            <Text>Refresh</Text>
          </Button>
        </Text>
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
    marginBottom: 5,
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

export default ErrorView;
