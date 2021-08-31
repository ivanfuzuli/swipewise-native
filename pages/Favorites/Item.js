import React from "react";
import { ListItem } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setModalQuoteId } from "../store/statusSlice";

const Item = ({ id, count, title, author, quote }) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(setModalQuoteId(id));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ListItem bottomDivider>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>+{count}</Text>
        </View>
        <ListItem.Content>
          <ListItem.Title>{author}</ListItem.Title>
          <ListItem.Subtitle>{title}</ListItem.Subtitle>
          <ListItem.Content>
            <Text numberOfLines={3}>{quote}</Text>
          </ListItem.Content>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    minWidth: 32,
    minHeight: 32,
    padding: 5,
    backgroundColor: "green",
    opacity: 0.8,
    justifyContent: "center",
  },

  badgeText: {
    textAlign: "center",
    color: "#fff",
  },
});

export default Item;
