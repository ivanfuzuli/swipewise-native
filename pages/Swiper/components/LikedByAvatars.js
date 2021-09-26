import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Avatar from "@src/pages/components/Avatar";
import { useNavigation } from "@react-navigation/native";

const LikedBy = ({ users = [], id, count = 0 }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Liked By", {
          id,
        })
      }
    >
      {users &&
        users.map((user) => {
          return <Avatar size="sm" seed={user} />;
        })}
      {count > 3 && (
        <View style={styles.count}>
          <Text>+{count - 3}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  count: {
    padding: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 50,
  },
});

export default LikedBy;
