import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Feather as Icon } from "@expo/vector-icons";

import { useDispatch } from "react-redux";

import { SwipeablePanel } from "rn-swipeable-panel";
import { setCurrentQuote, setShareInstagramOpen } from "../store/statusSlice";
import openShare from "@src/utils/openShare";
import Avatar from "./Avatar";
import { useNavigation } from "@react-navigation/native";

export default Modal = ({ byId, modalState, updateModalState }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { id, author, title, quote, username, count, isOpen, sub } = modalState;

  const currentQuote = byId[id];

  const handleClose = () => {
    updateModalState({
      isOpen: false,
    });
  };

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    onClose: () => handleClose(),
    onPressCloseButton: () => handleClose(),
    // ...or any prop you want
  });

  const handleShare = () => {
    openShare(author, title, quote);
  };
  const openInstagramShare = () => {
    dispatch(setCurrentQuote(currentQuote.quote));
    dispatch(setShareInstagramOpen(true));
  };

  const handlePress = () => {
    updateModalState({
      isOpen: false,
    });

    navigation.navigate("User Profile", {
      id: sub,
    });
  };
  return (
    <SwipeablePanel {...panelProps} isActive={isOpen} noBar>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleShare}>
          <Icon name="share" size={32} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
          <Icon name="instagram" size={32} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.info}>
        <Avatar seed={sub} size="md" />
        <Text>
          <Text style={styles.bold}>{username}</Text> gave{" "}
          <Text style={styles.bold}>{count}</Text> claps
        </Text>
      </TouchableOpacity>
      <View style={{ padding: 20 }}>
        <Text h3>{author}</Text>
        <Text h4>{title}</Text>
        <Text style={{ fontSize: 16 }}>{quote}</Text>
      </View>
    </SwipeablePanel>
  );
};

const styles = StyleSheet.create({
  info: { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  bold: { fontWeight: "bold" },
});
