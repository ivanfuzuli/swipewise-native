import React, { useEffect, useState, useRef, useMemo } from "react";

import {
  RefreshControl,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";

import Item from "./Item";
import Sort from "./Sort";
import Filter from "./Filter";

import Panel from "./Panel";
import ListEmpty from "./ListEmpty";
import ListFooter from "./ListFooter";
import Loading from "./Loading";

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
  const isScrolled = useRef(false);
  const flatlistRef = useRef(null);
  const isAppend = useRef(false);

  const sort = useSelector((state) => state.claps.sort);
  const filter = useSelector((state) => state.claps.filter);

  const errorMessage = useSelector((state) => state.claps.error);
  const isLoading = useSelector((state) => state.claps.loading);

  const byId = useSelector((state) => state.claps.byId);
  const allIds = useSelector((state) => state.claps.allIds);

  const upperLoading = !isAppend.current && isLoading;
  const downLoading = isAppend.current && isLoading;

  const items = sort === "popular" ? allIds.popular[filter] : allIds.newest;

  const quotes = useMemo(() => {
    return items.map((id) => {
      return byId[id];
    });
  }, [sort, items, filter, byId]);

  useEffect(() => {
    if (items.length === 0) {
      isScrolled.current = false;
      isAppend.current = true;
      dispatch(getClaps());
    }
  }, [sort, filter]);

  useEffect(() => {
    return () => {
      dispatch(resetSession());
    };
  }, []);

  const handleEndReached = () => {
    if (!isScrolled.current) {
      return;
    }

    isAppend.current = true;
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
    dispatch(resetSession());
    isScrolled.current = false;
    isAppend.current = false;
    dispatch(getClaps());
  };

  const handleSetSort = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    isScrolled.current = false;
    dispatch(setSort(type));
  };

  const handleSetFilter = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    isScrolled.current = false;
    dispatch(setFilter(type));
  };

  const handleMomentum = () => {
    isScrolled.current = true;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Sort setSort={handleSetSort} sort={sort} />
        {sort === "popular" ? (
          <Filter setFilter={handleSetFilter} filter={filter} />
        ) : null}

        <ErrorMessage message={errorMessage} />
        {downLoading && quotes.length < 1 && <Loading></Loading>}
        <FlatList
          ref={flatlistRef}
          data={quotes}
          refreshControl={
            <RefreshControl
              enabled
              refreshing={upperLoading}
              onRefresh={refresh}
              tintColor={"red"}
            />
          }
          ListFooterComponent={
            <ListFooter loading={quotes.length > 0 && downLoading} />
          }
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={handleEndReached}
          onMomentumScrollBegin={handleMomentum}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
      {!isLoading && !errorMessage && quotes.length < 1 && <ListEmpty />}
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
