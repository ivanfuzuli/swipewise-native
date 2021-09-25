import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Alert, StyleSheet } from "react-native";

import axios from "@src/config/@axios";
import { Text, Divider } from "react-native-elements";
import Favorites from "../Favorites/Favorites";
import Avatar from "../components/Avatar";

import { useSelector } from "react-redux";

import AvatarPlaceholder from "./AvatarPlaceholder";
import UsernamePlaceholder from "./UsernamePlaceholder";

const Profile = ({ route }) => {
  const _id = useSelector((state) => state.auth.user.sub);
  const sub = _id;

  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("me/info")
      .then(({ data }) => {
        setUsername(data.username);
        setLoading(false);
      })
      .catch((err) => Alert.alert(err.message));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.avatar_container}>
          {!isLoading ? <Avatar seed={sub} /> : <AvatarPlaceholder />}
          {!isLoading ? (
            <Text style={styles.username}>@{username}</Text>
          ) : (
            <UsernamePlaceholder />
          )}
        </View>
        <View style={styles.body}>
          <View style={styles.heading}>
            <Text h4>Favorites</Text>
            <Divider />
          </View>
          <Favorites sub={sub} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    margin: 15,
  },
  avatar_container: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    padding: 4,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
});
export default Profile;
