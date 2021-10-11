import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";

import Claps from "./Claps";

export default PanelContent = ({
  byId,
  id,
  sub,
  setModalQuoteId,
  setCount,
}) => {
  const userid = useSelector((state) => state.auth.user.sub);
  const currentQuote = byId[id];
  const isActive = id ? true : false;
  const me = userid === sub;

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
      me={me}
    >
      <View>
        <View>
          {me && (
            <Claps
              count={currentQuote?.count}
              quote_id={currentQuote?.quote._id}
              id={id}
              setCount={setCount}
            />
          )}
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
