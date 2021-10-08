import React, { useCallback, useEffect, useState } from "react";
import { View, SafeAreaView, Alert, StyleSheet } from "react-native";

import axios from "@src/config/@axios";
import { Text, Divider } from "react-native-elements";
import Favorites from "../Favorites/Favorites";
import Avatar from "../components/Avatar";
import { Feather as Icon } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import AvatarPlaceholder from "./AvatarPlaceholder";
import UsernamePlaceholder from "./UsernamePlaceholder";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Analytics from "@src/config/Analytics";

const Profile = ({ route, navigation }) => {
  const userid = useSelector((state) => state.auth.user.sub);
  const id = route.params?.id;
  const sub = id ? id : userid;

  useEffect(() => {
    if (id) {
      Analytics.track(Analytics.events.USER_PROFILE_OPENED);
    } else {
      Analytics.track(Analytics.events.OWN_PROFILE_OPENED);
    }
  }, [id]);

  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const endpoint = id ? `me/${id}` : "me/info";
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      axios
        .get(endpoint)
        .then(({ data }) => {
          setUsername(data.username);
          setLoading(false);
        })
        .catch((err) => Alert.alert(err.message))
        .finally(() => {
          setLoading(false);
        });
    }, [id])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.avatar_container}>
          {!isLoading ? <Avatar seed={sub} /> : <AvatarPlaceholder />}
          {!isLoading ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.username}>@{username}</Text>
              {!id && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Change Username")}
                >
                  <Icon name="edit" size={24} color="gray" />
                </TouchableOpacity>
              )}
            </View>
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
    marginRight: 10,
  },
});
export default Profile;
