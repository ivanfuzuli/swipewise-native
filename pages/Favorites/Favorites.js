import React, { useEffect, useRef, useMemo } from "react";

import {
  RefreshControl,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";

import Item from "./Item";
import Sort from "./Sort";
import Panel from "./Panel";
import ListEmpty from "./ListEmpty";

import ErrorMessage from "@src/components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { getClaps, setSort } from "../store/clapsSlice";

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const isScrolled = useRef(false);
  const flatlistRef = useRef(null);

  const sort = useSelector((state) => state.claps.sort);
  const errorMessage = useSelector((state) => state.claps.error);
  const isLoading = useSelector((state) => state.claps.loading);

  const byId = useSelector((state) => state.claps.byId);
  const allIds = useSelector((state) => state.claps.allIds);

  const quotes = useMemo(() => {
    if (sort === "popular") {
      return allIds.popular.map((id) => {
        return byId[id];
      });
    }

    return allIds.newest.map((id) => {
      return byId[id];
    });
  }, [sort, allIds, byId]);

  useEffect(() => {
    dispatch(getClaps(false));
  }, [sort]);

  handleRefresh = () => {
    if (!isScrolled.current) {
      return;
    }
    dispatch(getClaps(true));
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
    dispatch(getClaps(false));
  };

  const handleSetSort = (type) => {
    flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    isScrolled.current = false;
    dispatch(setSort(type));
  };

  const handleMomentum = () => {
    isScrolled.current = true;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Sort setSort={handleSetSort} sort={sort} />
        <ErrorMessage message={errorMessage} />
        <FlatList
          ref={flatlistRef}
          data={quotes}
          refreshControl={
            <RefreshControl
              enabled
              refreshing={isLoading}
              onRefresh={refresh}
              tintColor={"red"}
              ti
            />
          }
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={handleRefresh}
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
