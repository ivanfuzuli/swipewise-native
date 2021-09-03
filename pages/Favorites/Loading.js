import React from "react";
import { ActivityIndicator, View } from "react-native";
const Loading = () => {
  return (
    <View style={{ justifyContent: "center", padding: 15 }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

export default Loading;
