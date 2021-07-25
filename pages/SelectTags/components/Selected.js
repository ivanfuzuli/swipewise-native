import React from "react";

import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import tags from "./tags.json";

import { addTag, removeTag } from "../store/selectedSlice";
const Selected = () => {
  const dispatch = useDispatch();
  const selectedTags = useSelector((state) => state.selected.selectedTags);

  const handleToggle = (id) => {
    if (!selectedTags.includes(id)) {
      dispatch(addTag(id));
    } else {
      dispatch(removeTag(id));
    }
  };

  const isSelected = (id) => {
    return selectedTags.includes(id);
  };

  const getBoxStyle = (id) => {
    if (isSelected(id)) {
      return {
        ...styles.box,
        ...styles.boxActive,
      };
    }
    return styles.box;
  };
  return (
    <ScrollView>
      <Text style={styles.title}>
        Please select most favourite genres at least three.
      </Text>
      <View style={styles.container}>
        {tags.map((tag) => {
          return (
            <TouchableOpacity
              onPress={() => handleToggle(tag.id)}
              style={getBoxStyle(tag.id)}
              key={tag.id}
            >
              <View style={styles.selectbox}>
                <View style={styles.selecticon}>
                  {isSelected(tag.id) && (
                    <AntDesign name="check" size={18} color="green" />
                  )}
                </View>
                <View>
                  <Text style={styles.text}>{tag.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectbox: {
    flexDirection: "row",
  },
  selecticon: {
    marginRight: 5,
    minWidth: 18,
    marginLeft: 5,
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    margin: 5,
    padding: 15,
    borderColor: "#d1d1d1",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
  },

  boxActive: {
    borderColor: "green",
  },

  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Selected;
