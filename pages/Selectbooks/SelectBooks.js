import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";

import { useDispatch } from "react-redux";

import { Container, View, Text, Button } from "native-base";

import SearchBox from "./components/SearchBox";
import Selected from "./components/Selected";

const BookSelect = () => {
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.searchPlaceholder}></View>
        <SearchBox />
        <View>
          <Selected />
        </View>
        <View style={styles.footer}>
          <View>
            <Button disabled>
              <Text>Next</Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {},
  searchPlaceholder: {
    height: 150,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    justifyContent: "space-between",
  },

  footer: {
    marginBottom: 30,
    alignItems: "flex-end",
  },
});

export default BookSelect;
