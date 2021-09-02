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
import ListFooter from "./ListFooter";

import ErrorMessage from "@src/components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  getClaps,
  setSort,
  resetSession,
  limitSize,
} from "../store/clapsSlice";

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const isScrolled = useRef(false);
  const flatlistRef = useRef(null);
  const isAppend = useRef(false);

  const sort = useSelector((state) => state.claps.sort);
  const errorMessage = useSelector((state) => state.claps.error);
  const isLoading = useSelector((state) => state.claps.loading);

  const byId = useSelector((state) => state.claps.byId);
  const allIds = useSelector((state) => state.claps.allIds);

  const upperLoading = !isAppend.current && isLoading;
  const downLoading = isAppend.current && isLoading;

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
    if (allIds[sort].length === 0) {
      isAppend.current = false;
      dispatch(getClaps());
    }
  }, [sort]);

  useEffect(() => {
    return () => {
      dispatch(limitSize());
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
              refreshing={upperLoading}
              onRefresh={refresh}
              tintColor={"red"}
              ti
            />
          }
          ListFooterComponent={<ListFooter loading={downLoading} />}
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
