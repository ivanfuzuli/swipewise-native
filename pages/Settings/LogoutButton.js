import React, { useState } from "react";
import PubSub from "pubsub-js";

import { Modal, StyleSheet, Pressable } from "react-native";
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
const LogoutButton = ({ email }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };
  const logout = () => {
    PubSub.publish("auth", "logout");
  };

  return (
    <>
      <ListItem onPress={handlePress}>
        <Left>
          <Text>Logout</Text>
        </Left>
      </ListItem>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to logout?</Text>
            <Text style={styles.modalText}>
              Before logout check is your e-mail correct?
            </Text>
            <Text style={styles.modalText}>{email}</Text>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No!</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={logout}
              >
                <Text style={styles.textStyle}>Yes! Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonView: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
    marginLeft: 5,
  },
  buttonClose: {
    backgroundColor: "#ddd",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LogoutButton;
