import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Feather as Icon } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import { SwipeablePanel } from "rn-swipeable-panel";
import {
  setModalQuoteId,
  setCurrentQuote,
  setShareInstagramOpen,
} from "../store/statusSlice";
import openShare from "@src/utils/openShare";
import Claps from "./Claps";

export default Modal = ({ byId, setCount }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.status.modalQuoteId);

  const currentQuote = byId[id];
  const isActive = id ? true : false;

  const handleClose = () => {
    dispatch(setModalQuoteId(null));
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
    openShare(
      currentQuote?.quote?.author,
      currentQuote?.quote?.title,
      currentQuote?.quote?.quote
    );
  };
  const openInstagramShare = () => {
    dispatch(setCurrentQuote(currentQuote.quote));
    dispatch(setShareInstagramOpen(true));
  };

  return (
    <SwipeablePanel {...panelProps} isActive={isActive}>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Claps
          count={currentQuote?.count}
          quote_id={currentQuote?.quote._id}
          id={id}
          setCount={setCount}
        />
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleShare}>
          <Icon name="share" size={32} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
          <Icon name="instagram" size={32} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>
        <Text h3>{currentQuote?.quote?.author}</Text>
        <Text h4>{currentQuote?.quote?.title}</Text>
        <Text style={{ fontSize: 16 }}>{currentQuote?.quote?.quote}</Text>
      </View>
    </SwipeablePanel>
  );
};

const styles = StyleSheet.create({});
