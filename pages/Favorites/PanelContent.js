import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

import { setModalQuoteId } from "../store/statusSlice";
import Claps from "./Claps";

export default PanelContent = ({ byId, setCount }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.status.modalQuoteId);

  const currentQuote = byId[id];
  const isActive = id ? true : false;

  const handleClose = () => {
    dispatch(setModalQuoteId(null));
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
