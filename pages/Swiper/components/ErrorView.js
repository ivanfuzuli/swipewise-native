import React from "react";
import { useDispatch } from "react-redux";

import { StyleSheet, Dimensions, SafeAreaView, View } from "react-native";
import { Text, Button } from "react-native-elements";
import LottieView from "lottie-react-native";
import { getQuotes } from "../../store/statusSlice";
import Header from "./Header";

const { width } = Dimensions.get("window");

const ErrorView = () => {
  const dispatch = useDispatch();

  const handlePress = async () => {
    await dispatch(getQuotes());
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header isEmpty />
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
          <Button title="Refresh" onPress={handlePress}></Button>
        </Text>
      </View>
    </SafeAreaView>
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
