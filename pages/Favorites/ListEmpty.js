import React from "react";
import { View, Text } from "react-native";

const ListEmpty = () => {
  return (
    <View style={{ flex: 1, margin: 50 }}>
      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
        There is no favorite quote yet. Please clap at least a few quotes.
      </Text>
    </View>
  );
};

export default ListEmpty;
