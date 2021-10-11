import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import PanelFooter from "./PanelFooter";

export default Panel = ({
  quoteId,
  author,
  title,
  quote,
  isOpen,
  onClose,
  children,
}) => {
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
      <View style={styles.panel}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="closecircle" size={24} />
          </TouchableOpacity>
        </View>
        {children}
        <PanelFooter
          onPanelClose={onClose}
          quoteId={quoteId}
          author={author}
          title={title}
          quote={quote}
        />
      </View>
    </Modal>
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
