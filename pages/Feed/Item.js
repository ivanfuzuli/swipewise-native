import React from "react";
import { ListItem } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Avatar from "../components/Avatar";

const Item = ({
  id,
  quoteId,
  count,
  title,
  author,
  quote,
  sub,
  username,
  updateModalState,
}) => {
  const handlePress = () => {
    updateModalState({
      id,
      quoteId,
      count,
      title,
      author,
      quote,
      sub,
      username,
      updateModalState,
      isOpen: true,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ListItem bottomDivider>
        <View style={styles.badge}>
          <Avatar seed={sub} size="sm" />
        </View>
        <ListItem.Content>
          <ListItem.Subtitle>
            <Text style={styles.bold}>{username}</Text> gave{" "}
            <Text style={styles.bold}>{count}</Text> claps
          </ListItem.Subtitle>
          <ListItem.Title>{author}</ListItem.Title>
          <ListItem.Subtitle>{title}</ListItem.Subtitle>
          <ListItem.Content>
            <Text numberOfLines={4}>{quote}</Text>
          </ListItem.Content>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default React.memo(Item);
