import axios from "@src/config/@axios";

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";

import Analytics from "@src/config/Analytics";

import Avatar from "../components/Avatar";
import LikedByPlaceholder from "./LikedByPlaceholder";

const LikedBy = ({ route, navigation }) => {
  useEffect(() => {
    Analytics.track(Analytics.events.LIKED_BY_OPENED);
  }, []);

  const id = route.params.id;

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`quotes/${id}`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        Alert.alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const placeholders = ["_", "_", "_"];
  return (
    <View style={styles.container}>
      {!isLoading &&
        users.map((user) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User Profile", {
                  id: user.user._id,
                })
              }
              style={styles.avatar_container}
              key={user.user._id}
            >
              <Avatar size="lg" seed={user.user._id} />
              <Text numberOfLines={1} style={styles.username}>
                {user.user.username}
              </Text>
            </TouchableOpacity>
          );
        })}
      {isLoading &&
        placeholders.map((_, index) => {
          return <LikedByPlaceholder key={index} />;
        })}

      {!isLoading && users.length < 1 && <Text>No user...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },

  text: {
    marginTop: 5,
    flexWrap: "wrap",
    textAlign: "center",
  },
  avatar_container: {
    width: 84,
    padding: 10,
    justifyContent: "center",
  },
});

export default LikedBy;
