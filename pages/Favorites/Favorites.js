import React, { useEffect, useState, useRef, useMemo } from "react";

import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";

import Item from "./Item";
import Sort from "./Sort";
import Filter from "./Filter";

import Panel from "./Panel";
import ListEmpty from "./ListEmpty";
import ListFooter from "./ListFooter";

import ErrorMessage from "@src/components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  getClaps,
  setSort,
  setFilter,
  resetSession,
} from "../store/clapsSlice";

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const flatlistRef = useRef(null);

  const sort = useSelector((state) => state.claps.sort);
  const filter = useSelector((state) => state.claps.filter);

  const errorMessage = useSelector((state) => state.claps.error);
  const isLoading = useSelector((state) => state.claps.loading);
  const [isRefresh, setRefresh] = useState(false);

  const byId = useSelector((state) => state.claps.byId);
  const allIds = useSelector((state) => state.claps.allIds);

  const items = sort === "popular" ? allIds.popular[filter] : allIds.newest;

  const quotes = useMemo(() => {
    return items.map((id) => {
      return byId[id];
    });
  }, [sort, items, filter, byId]);

  useEffect(() => {
    if (items.length === 0) {
      setRefresh(false);
      dispatch(getClaps());
    }
  }, [sort, filter]);

  useEffect(() => {
    return () => {
      dispatch(resetSession());
    };
  }, []);

  const handleEndReached = () => {
    setRefresh(false);
    dispatch(getClaps());
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
    dispatch(resetSession());
    dispatch(getClaps());
  };

  const handleSetSort = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    dispatch(setSort(type));
  };

  const handleSetFilter = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    dispatch(setFilter(type));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Sort setSort={handleSetSort} sort={sort} />
        {sort === "popular" ? (
          <Filter setFilter={handleSetFilter} filter={filter} />
        ) : null}

        <ErrorMessage message={errorMessage} />
        <FlatList
          ref={flatlistRef}
          data={quotes}
          ListFooterComponent={<ListFooter loading={!isRefresh && isLoading} />}
          refreshControl={
            <RefreshControl
              enabled
              refreshing={isRefresh && isLoading}
              onRefresh={refresh}
              tintColor={"red"}
            />
          }
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
      {!isLoading && quotes.length < 1 && <ListEmpty />}
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
