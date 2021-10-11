import React from "react";

import { useDispatch } from "react-redux";

import { setCurrentQuote, setShareInstagramOpen } from "../store/statusSlice";
import openShare from "@src/utils/openShare";
import { Feather as Icon } from "@expo/vector-icons";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import ClapsButton from "./ClapsButton";

const PanelFooter = ({ onPanelClose, quoteId, author, title, quote }) => {
  const dispatch = useDispatch();

  const handleShare = () => {
    openShare(author, title, quote);
  };
  const openInstagramShare = () => {
    onPanelClose && onPanelClose();
    dispatch(
      setCurrentQuote({
        author,
        title,
        quote,
      })
    );
    dispatch(setShareInstagramOpen(true));
  };

  return (
    <View style={styles.footer}>
      <View style={styles.left}>
        {quoteId && <ClapsButton quoteId={quoteId} />}
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleShare}>
          <Icon name="share" size={32} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
          <Icon name="instagram" size={32} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    marginRight: 10,
  },
  right: {
    flexDirection: "row",
  },

  left: {},
});
export default PanelFooter;
