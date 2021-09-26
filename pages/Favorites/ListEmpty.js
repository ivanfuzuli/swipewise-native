import React from "react";
import { View, Text } from "react-native";

const ListEmpty = () => {
  return (
    <View style={{ flex: 1, margin: 50 }}>
      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
        There is no favorite quote yet.
      </Text>
    </View>
  );
};

export default ListEmpty;
