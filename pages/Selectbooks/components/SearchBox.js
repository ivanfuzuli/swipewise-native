import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { searchBooks } from "../store/selectedSlice";
import { StyleSheet, View, TextInput } from "react-native";

import Results from "./Results";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.selected.searchValue);
  const searchState = useSelector((state) => state.selected.bookSearchState);

  const search = (value) => {
    dispatch(searchBooks(value));
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <TextInput
            placeholder="Search and Select Books"
            style={styles.searchInput}
            autoCapitalize="none"
            autoCompleteType="off"
            value={searchValue}
            onChangeText={search}
          />
        </View>
        <Results />
      </View>
      {!!searchValue && <View style={styles.overlay}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0, .4)",
    zIndex: 3,
  },

  searchContainer: {
    zIndex: 4,
    position: "absolute",
    right: 0,
    left: 0,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
  },

  searchView: {
    backgroundColor: "#f0f2f5",
    padding: 5,
    borderRadius: 50,
  },

  searchInput: {
    padding: 10,
    fontSize: 24,
  },

  footer: {
    marginBottom: 30,
    alignItems: "flex-end",
  },
});

export default SearchBox;
