import React, { useRef } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { useDispatch } from "react-redux";

import { Container, View, Text, Button } from "native-base";

import { useSelector } from "react-redux";

import SearchBox from "./components/SearchBox";
import Selected from "./components/Selected";

const BookSelect = () => {
  const selectedBooks = useSelector((state) => state.selected.selectedBooks);
  const isDisabled = selectedBooks.length < 3;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <View style={styles.container}>
          <View style={styles.searchPlaceholder}></View>
          <SearchBox />
          <Selected />
          <View style={styles.footer}>
            <View>
              <Button disabled={isDisabled}>
                <Text>Next</Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchPlaceholder: {
    height: 100,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    justifyContent: "space-between",
  },

  footer: {
    marginBottom: 50,
    alignItems: "flex-end",
  },
});

export default BookSelect;
