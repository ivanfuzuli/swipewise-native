import { version } from "../../package.json";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

const Settings = ({ navigation }) => {
  const email = useSelector((state) => state.auth.user.email);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.profile}>
        <Text style={styles.profile_text}>{email}</Text>
      </View>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("Change Email")}
      >
        <ListItem.Content>
          <ListItem.Title>Change E-Mail</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("Change Username")}
      >
        <ListItem.Content>
          <ListItem.Title>Change Username</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("Change Password")}
      >
        <ListItem.Content>
          <ListItem.Title>Change Password</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("Change Tags")}
      >
        <ListItem.Content>
          <ListItem.Title>Change Tags</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <LogoutButton email={email} />
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("Delete Account")}
      >
        <ListItem.Content>
          <ListItem.Title>Delete Account</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate("Feedback")}>
        <ListItem.Content>
          <ListItem.Title>Feedback</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <View style={styles.version}>
        <Text>Version: ({version})</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  version: {
    marginTop: 10,
    alignItems: "center",
  },
  profile: {
    padding: 10,
  },
  profile_text: {
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default Settings;
