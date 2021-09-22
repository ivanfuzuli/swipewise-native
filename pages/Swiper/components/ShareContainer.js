import React from "react";
import { Feather as Icon } from "@expo/vector-icons";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import openShare from "@src/utils/openShare";
import {
  setShareInstagramOpen,
  setCurrentQuote,
} from "@src/pages/store/statusSlice";
const ShareContainer = ({ quote }) => {
  const dispatch = useDispatch();

  const openInstagramShare = () => {
    dispatch(setCurrentQuote(quote));
    dispatch(setShareInstagramOpen(true));
  };

  const handleShare = () => {
    openShare(quote.author, quote.title, quote.quote);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mr10} onPress={handleShare}>
        <Icon name="share" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
        <Icon name="instagram" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  mr10: {
    marginRight: 10,
  },
});

export default ShareContainer;
