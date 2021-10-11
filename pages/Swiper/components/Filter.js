import React, { useState } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import FilterModal from "./FilterModal";

const Filter = () => {
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "flex-end",
          flexDirection: "row",
          marginRight: 15,
          marginBottom: 15,
        }}
      >
        <TouchableOpacity style={styles.filterButton} onPress={toggle}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Genres
          </Text>
          {isOpen ? (
            <Feather name="chevron-up" size={18} color="#000"></Feather>
          ) : (
            <Feather name="chevron-down" size={18} color="#000"></Feather>
          )}
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View style={styles.filter}>
          <TouchableOpacity style={styles.editButton} onPress={openModal}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Love</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Humor</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Philosophy</Text>
          </View>
        </View>
      )}
      <FilterModal isOpen={isModalOpen} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  button: {
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#000",
  },

  editButton: {
    position: "absolute",
    color: "#0078fa",
    top: 5,
    right: 5,
  },

  editButtonText: {
    color: "#0078fa",
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
  },
});

export default Filter;
