import Constants from "expo-constants";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  ListItem,
  List,
  Left,
  Right,
  Icon,
  Text,
  View,
} from "native-base";
import PubSub from "pubsub-js";
import { useSelector } from "react-redux";

const Settings = ({ navigation }) => {
  const email = useSelector((state) => state.auth.user.email);
  const version = Constants.manifest.version;
  const logout = () => {
    PubSub.publish("auth", "logout");
  };

  return (
    <Container>
      <Content>
        <View style={styles.profile}>
          <Text style={styles.profile_text}>{email}</Text>
        </View>
        <List>
          <ListItem onPress={() => navigation.navigate("Change Email")}>
            <Left>
              <Text>Change E-Mail</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate("Change Password")}>
            <Left>
              <Text>Change Password</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate("Delete Account")}>
            <Left>
              <Text>Delete Account</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={logout}>
            <Left>
              <Text>Logout</Text>
            </Left>
          </ListItem>
        </List>
        <View style={styles.version}>
          <Text>Version: ({version})</Text>
        </View>
      </Content>
    </Container>
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
