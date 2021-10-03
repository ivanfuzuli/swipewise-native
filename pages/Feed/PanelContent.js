import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import Panel from "../components/Panel";

export default PanelContent = ({ modalState, updateModalState }) => {
  const navigation = useNavigation();

  const { id, author, title, quote, username, count, isOpen, sub } = modalState;

  const handleClose = () => {
    updateModalState({
      isOpen: false,
    });
  };

  const handlePress = () => {
    updateModalState({
      isOpen: false,
    });

    navigation.navigate("User Profile", {
      id: sub,
    });
  };
  return (
    <Panel
      onClose={handleClose}
      isOpen={isOpen}
      author={author}
      title={title}
      quote={quote}
      username={username}
    >
      <TouchableOpacity
        onClose={handleClose}
        onPress={handlePress}
        style={styles.info}
      >
        <Avatar seed={sub} size="md" />
        <Text>
          <Text style={styles.bold}>{username}</Text> gave{" "}
          <Text style={styles.bold}>{count}</Text> claps
        </Text>
      </TouchableOpacity>
      <View style={{ padding: 20 }}>
        <Text h3>{author}</Text>
        <Text h4>{title}</Text>
        <Text style={{ fontSize: 16 }}>{quote}</Text>
      </View>
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingRight: 10,
  },
  panel: {
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  info: { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  bold: { fontWeight: "bold" },
});
