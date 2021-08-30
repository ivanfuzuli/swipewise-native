import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Feather as Icon } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import { SwipeablePanel } from "rn-swipeable-panel";
import { setCurrentQuote } from "../store/statusSlice";

export default Modal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const currentQuote = useSelector((state) => state.status.currentQuote);

  const isActive = currentQuote ? true : false;

  const handleClose = () => {
    dispatch(setCurrentQuote(null));
  };

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    onClose: () => handleClose(),
    onPressCloseButton: () => handleClose(),
    // ...or any prop you want
  });

  const handleShare = () => {};
  const openInstagramShare = () => {};
  return (
    <SwipeablePanel {...panelProps} isActive={isActive}>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 25,
            flexDirection: "row",
          }}
        >
          <View>
            <Icon name="thumbs-down" size={32} color="gray" />
          </View>
          <View style={{ padding: 5 }}>
            <Text style={{ color: "grey", fontWeight: "bold" }}>
              +{currentQuote?.count}
            </Text>
          </View>
          <View>
            <Icon name="thumbs-up" size={32} color="gray" />
          </View>
        </View>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleShare}>
          <Icon name="share" size={32} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
          <Icon name="instagram" size={32} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>
        <Text h3>{currentQuote?.author}</Text>
        <Text h4>{currentQuote?.title}</Text>
        <Text style={{ fontSize: 16 }}>{currentQuote?.quote}</Text>
      </View>
    </SwipeablePanel>
  );
};

const styles = StyleSheet.create({});
