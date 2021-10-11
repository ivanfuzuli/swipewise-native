import React from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Text, Button } from "react-native-elements";

export default Panel = ({ isOpen, onClose }) => {
  return (
    <Modal
      isVisible={isOpen}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      useNativeDriverForBackdrop
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.panel}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="closecircle" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.panel}>
          <Text>Panel</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingRight: 10,
  },
  panel: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    height: "100%",
  },
  info: { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  bold: { fontWeight: "bold" },
});
