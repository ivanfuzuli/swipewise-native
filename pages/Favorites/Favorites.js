import React, { useEffect, useState, useRef, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import axios from "@src/config/@axios";
import axiosOrginal from "axios";

import Item from "./Item";
import Sort from "./Sort";
import Filter from "./Filter";

import Panel from "./Panel";
import ListEmpty from "./ListEmpty";
import ListFooter from "./ListFooter";

import reducer, {
  initialState,
  SET_SORT,
  SET_FILTER,
  FETCH_FAILED,
  FETCH_SUCCESS,
  FETCH_PENDING,
  LIMIT,
  RESET,
  SET_COUNT,
} from "./favorites.reducer";

import ErrorMessage from "@src/components/ErrorMessage";
const CancelToken = axiosOrginal.CancelToken;
let cancel;

const Favorites = ({ sub }) => {
  const flatlistRef = useRef(null);
  const offsetRef = useRef(0);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { filter, sort, error, loading, byId, allIds } = state;

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

      const response = await axios.get(`claps`, {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
        params: {
          offset: offsetRef.current,
          limit: LIMIT,
          sort,
          filter,
          sub: sub,
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
  }, [sort, sub, filter]);

  const handleEndReached = () => {
    setRefresh(false);
    fetchQuotes(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        id={item._id}
        count={item.count}
        title={item.quote.title}
        author={item.quote.author}
        quote={item.quote.quote}
      />
    );
  };

  const refresh = () => {
    setRefresh(true);
    resetAndFetch();
  };

  const handleSetSort = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    dispatch({
      type: SET_SORT,
      payload: type,
    });
  };

  const handleSetFilter = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    dispatch({
      type: SET_FILTER,
      payload: type,
    });
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
        <Sort setSort={handleSetSort} sort={sort} />
        {sort === "popular" ? (
          <Filter setFilter={handleSetFilter} filter={filter} />
        ) : null}

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
      <Panel byId={byId} setCount={setCount} />
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

export default Favorites;
