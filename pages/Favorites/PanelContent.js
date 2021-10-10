import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import Claps from "./Claps";

export default PanelContent = ({ byId, id, setModalQuoteId, setCount }) => {
  const currentQuote = byId[id];
  const isActive = id ? true : false;

  const handleClose = () => {
    setModalQuoteId(null);
  };

  const { author, title, quote } = currentQuote?.quote || {};
  return (
    <Panel
      onClose={handleClose}
      isOpen={isActive}
      author={author}
      title={title}
      quote={quote}
    >
      <View>
        <View>
          <Claps
            count={currentQuote?.count}
            quote_id={currentQuote?.quote._id}
            id={id}
            setCount={setCount}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text h3>{currentQuote?.quote?.author}</Text>
          <Text h4>{currentQuote?.quote?.title}</Text>
          <Text style={{ fontSize: 16 }}>{currentQuote?.quote?.quote}</Text>
        </View>
      </View>
    </Panel>
  );
};

const styles = StyleSheet.create({});
