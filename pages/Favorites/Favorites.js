import React, { useEffect, useRef, useState } from "react";
import axios from "../../config/@axios";

import {
  RefreshControl,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";

import Item from "./Item";
import Order from "./Order";
import Panel from "./Panel";
import ErrorMessage from "../../components/ErrorMessage";

const LIMIT = 15;

const Favorites = ({ navigation }) => {
  const offsetRef = useRef(0);
  const totalRef = useRef(LIMIT);
  const completedRef = useRef(false);
  const orderRef = useRef("popular");

  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [quotes, setQuotes] = useState([]);

  const refresh = async (offset, reset) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const result = await axios.get(
        `claps?offset=${offset}&limit=${LIMIT}&sort=${orderRef.current}`
      );
      const { data, headers } = result;
      totalRef.current = parseInt(headers["x-total-count"]);

      if (reset) {
        setQuotes(data);
      } else {
        setQuotes((prev) => [...prev, ...data]);
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh(0);
  }, []);

  handleRefresh = () => {
    const completed = completedRef.current;
    const total = totalRef.current;
    const offset = offsetRef.current;

    let nextOffset = offset + LIMIT;

    if (completed) {
      return;
    }

    if (nextOffset >= total) {
      nextOffset = total;
      completed.current = true;
    }

    offsetRef.current = nextOffset;

    refresh(nextOffset);
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        count={item.count}
        title={item.quote.title}
        author={item.quote.author}
        quote={item.quote.quote}
      />
    );
  };

  const reset = () => {
    offsetRef.current = 0;
    totalRef.current = LIMIT;
    completedRef.current = false;
  };

  const resetAndRefresh = () => {
    reset();
    refresh(0, true);
  };

  const setOrder = (order) => {
    setQuotes([]);
    orderRef.current = order;
    resetAndRefresh();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Order setOrder={setOrder} />
        <ErrorMessage message={errorMessage} />
        <FlatList
          data={quotes}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={resetAndRefresh}
            />
          }
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={handleRefresh}
          onEndReachedThreshold={0.5}
        />
        {!isLoading && !errorMessage && quotes.length < 1 && (
          <View style={styles.center}>
            <Text>
              There is no favorite quote yet. Please clap a few quotes.
            </Text>
          </View>
        )}
      </SafeAreaView>
      <Panel />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default Favorites;
