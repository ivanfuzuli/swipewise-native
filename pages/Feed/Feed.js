import React, { useEffect, useState, useRef, useMemo } from "react";
import { useImmerReducer } from "use-immer";

import Analytics from "@src/config/Analytics";

import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import axios from "@src/config/@axios";
import axiosOrginal from "axios";

import Item from "./Item";

import ListEmpty from "./ListEmpty";
import ListFooter from "../Favorites/ListFooter";

import reducer, {
  initialState,
  FETCH_FAILED,
  FETCH_SUCCESS,
  FETCH_PENDING,
  LIMIT,
  RESET,
  SET_COUNT,
} from "./feed.reducer";

import ErrorMessage from "@src/components/ErrorMessage";
import PanelContent from "./PanelContent";

const CancelToken = axiosOrginal.CancelToken;
let cancel;

const Feed = () => {
  useEffect(() => {
    Analytics.track(Analytics.events.FEED_OPENED);
  }, []);

  const flatlistRef = useRef(null);
  const offsetRef = useRef(0);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [modalState, setModalState] = useState({
    id: null,
    count: null,
    title: null,
    author: null,
    quote: null,
    sub: null,
    username: null,
    isOpen: false,
  });

  const { error, loading, byId, allIds } = state;
  const [isRefresh, setRefresh] = useState(false);

  const quotes = useMemo(() => {
    return allIds.map((id) => {
      return byId[id];
    });
  }, [allIds, byId]);

  const fetchQuotes = async () => {
    cancel && cancel();
    try {
      dispatch({
        type: FETCH_PENDING,
      });

      const response = await axios.get(`feed`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
        params: {
          offset: offsetRef.current,
          limit: LIMIT,
        },
      });

      const quotes = response.data;
      const total = response.headers["x-total-count"];
      cancel = null;

      let nextOffset = parseInt(offsetRef.current + LIMIT);
      if (nextOffset > total) {
        nextOffset = total;
      }
      offsetRef.current = nextOffset;
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          quotes,
          total,
        },
      });
    } catch (e) {
      if (axiosOrginal.isCancel(e)) {
        return;
      }

      dispatch({
        type: FETCH_FAILED,
        payload: {
          error: e.message,
        },
      });
    }
  };

  const resetAndFetch = () => {
    offsetRef.current = 0;
    dispatch({
      type: RESET,
    });
    fetchQuotes();
  };

  useEffect(() => {
    setRefresh(false);

    resetAndFetch();
  }, []);

  const handleEndReached = () => {
    setRefresh(false);
    fetchQuotes(false);
  };

  const updateModalState = (obj) => {
    setModalState((state) => ({
      ...state,
      ...obj,
    }));
  };
  const renderItem = ({ item }) => {
    return (
      <Item
        id={item._id}
        count={item.count}
        title={item.quote.title}
        author={item.quote.author}
        quote={item.quote.quote}
        quoteId={item._quote_id}
        sub={item.user._id}
        username={item.user.username}
        updateModalState={updateModalState}
      />
    );
  };

  const refresh = () => {
    setRefresh(true);
    resetAndFetch();
  };

  const setCount = (id, count) => {
    dispatch({
      type: SET_COUNT,
      payload: {
        id,
        count,
      },
    });
  };
  return (
    <>
      <View style={styles.container}>
        <ErrorMessage message={error} />
        <FlatList
          ref={flatlistRef}
          data={quotes}
          ListFooterComponent={<ListFooter loading={!isRefresh && loading} />}
          refreshControl={
            <RefreshControl
              enabled
              refreshing={isRefresh && loading}
              onRefresh={refresh}
              tintColor={"red"}
            />
          }
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
      {!loading && quotes.length < 1 && <ListEmpty />}
      <PanelContent
        modalState={modalState}
        setCount={setCount}
        updateModalState={updateModalState}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default Feed;
