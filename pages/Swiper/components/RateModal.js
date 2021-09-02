import React from "react";
import env from "@src/config/@env";
import Rate, { AndroidMarket } from "react-native-rate";

import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
const RateModal = ({ open, onClose }) => {
  const openRateDialog = () => {
    const options = {
      AppleAppID: env.AppleAppID,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
    };

    Rate.rate(options);
  };

  const rateAndClose = () => {
    onClose();
    openRateDialog();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Would you like to rate us on the Store?
          </Text>
          <Button onPress={rateAndClose} title="Rate Now!"></Button>
          <View style={{ marginTop: 25 }}>
            <Button onPress={onClose} title="Close" type="clear" />
          </View>
        </View>
      </View>
    </Modal>
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

export default RateModal;
