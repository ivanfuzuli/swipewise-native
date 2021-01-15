import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "native-base";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const Empty = ({ item }) => {
  const likeRef = useRef(null);

  useEffect(() => {
    likeRef.current.play();
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        ref={likeRef}
        style={{
          width: 54,
          height: height / 2,
        }}
        loop
        source={require("../../../assets/yoga.json")}
      />
      <Text>Rest time..</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexGrow: 2,
    width: width,
    height: height - 120,
    marginLeft: 16,
    alignItems: "center",
  },
});

export default Empty;
