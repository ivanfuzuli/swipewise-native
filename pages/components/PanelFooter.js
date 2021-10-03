import React from "react";

import { useDispatch } from "react-redux";

import { setCurrentQuote, setShareInstagramOpen } from "../store/statusSlice";
import openShare from "@src/utils/openShare";
import { Feather as Icon } from "@expo/vector-icons";

import { StyleSheet, View, TouchableOpacity } from "react-native";

const PanelFooter = ({ author, title, quote }) => {
  const dispatch = useDispatch();

  const handleShare = () => {
    openShare(author, title, quote);
  };
  const openInstagramShare = () => {
    handleClose();
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
      <TouchableOpacity style={{ marginRight: 10 }} onPress={handleShare}>
        <Icon name="share" size={32} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
        <Icon name="instagram" size={32} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 10,
    marginRight: 10,
  },
});
export default PanelFooter;
