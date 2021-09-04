import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
const ListFooter = ({ loading }) => {
  const opacity = loading ? 1 : 0;

  return (
    <View style={{ opacity, justifyContent: "center", padding: 15 }}>
      <ActivityIndicator size="small" color="red" />
    </View>
  );
};

export default ListFooter;
