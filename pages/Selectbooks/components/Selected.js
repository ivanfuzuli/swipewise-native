import React, { useState } from "react";

import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button, Icon, Text } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { removeByIndex } from "../store/selectedSlice";
const Selected = () => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState({});

  const handleToggle = (id) => {
    let status = false;
    if (!selectedTags[id]) {
      status = true;
    }

    setSelectedTags((items) => ({ ...items, [id]: status }));
    console.log("selcted", selectedTags);
  };

  const tags = [
    {
      id: "philosohpy",
      name: "Philosophy",
    },
    {
      id: "love",
      name: "Love",
    },
    {
      id: "inspiring",
      name: "Inspire",
    },
    {
      id: "life",
      name: "Life",
    },
    {
      id: "humor",
      name: "Humor",
    },
    {
      id: "Death",
      name: "Death",
    },
    {
      id: "happiness",
      name: "Happiness",
    },
    {
      id: "romance",
      name: "Romance",
    },
    { id: "knowledge", name: "Knowledge" },
    { id: "best", name: "Best of" },
    { id: "darkness", name: "Darkness" },
    { id: "truth", name: "Truth" },
    { id: "dance", name: "Dance" },
    { id: "friend", name: "Friend" },
    { id: "enmy", name: "Enemy" },
    { id: "rational", name: "Rational" },
  ];

  const isSelected = (id) => {
    console.log(selectedTags, "id" + id, selectedTags[id]);
    return selectedTags[id];
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
        Please select most favourite categories at least three.
      </Text>
      <View style={styles.container}>
        {tags.map((tag) => {
          return (
            <TouchableOpacity
              onPress={() => handleToggle(tag.id)}
              style={getBoxStyle(tag.id)}
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
