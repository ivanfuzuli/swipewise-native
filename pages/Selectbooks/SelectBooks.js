import React, { useRef } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { useDispatch } from "react-redux";

import { Container, View, Text, Button } from "native-base";

import { useSelector } from "react-redux";

import Selected from "./components/Selected";

const BookSelect = () => {
  const selectedTags = useSelector((state) => state.selected.selectedTags);
  const isDisabled = selectedTags.length < 3;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <View style={styles.container}>
          <View style={styles.main}>
            <Selected />
          </View>
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    justifyContent: "space-between",
  },

  main: {
    flexGrow: 1,
    flexBasis: 0,
  },

  footer: {
    marginBottom: 50,
    alignItems: "flex-end",
  },
});

export default BookSelect;
