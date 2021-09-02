import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setCount } from "../store/clapsSlice";
import { sendClap } from "../store/votesSlice";
import debounce from "lodash/debounce";
const SEND_DEBOUNCE = 2000;

const Claps = ({ count, id, quote_id }) => {
  const dispatch = useDispatch();
  const debouncedRef = useRef(
    debounce((quote_id, count) => {
      const vote = {
        quote_id,
        type: "clap",
        count,
      };
      dispatch(sendClap(vote));
    }, SEND_DEBOUNCE)
  );
  const vote = (inc = true) => {
    let increment = -1;
    if (inc) {
      increment = 1;
    }
    let newCount = count + increment;
    if (newCount < 1) {
      newCount = 0;
    }

    if (newCount > 30) {
      newCount = 30;
    }
    dispatch(
      setCount({
        id,
        count: newCount,
      })
    );

    debouncedRef.current(quote_id, newCount);
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginRight: 25,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={() => vote(false)}>
        <Icon name="thumbs-down" size={32} color="gray" />
      </TouchableOpacity>
      <View style={{ padding: 5 }}>
        <Text style={{ color: "grey", fontWeight: "bold" }}>+{count}</Text>
      </View>
      <TouchableOpacity onPress={() => vote(true)}>
        <Icon name="thumbs-up" size={32} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default Claps;
