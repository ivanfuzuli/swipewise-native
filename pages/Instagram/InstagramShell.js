import React from "react";
import { View } from "react-native";
import InstagramModal from "./InstagramModal";
import { useSelector } from "react-redux";

const InstagramShell = () => {
  const shareOpen = useSelector((state) => state.status.shareInstagramOpen);
  const quote = useSelector((state) => state.status.currentQuote);
  if (!shareOpen) {
    return null;
  }

  return <InstagramModal quote={quote} />;
};

export default InstagramShell;
