import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";

import { Container, View, Text, Button } from "native-base";

import { useSelector } from "react-redux";
import Selected from "./components/Selected";

const disableNavigation = (e) => {
  e.preventDefault();
  return;
};

const BookSelect = ({ navigation }) => {
  const selectedTags = useSelector((state) => state.selected.selectedTags);
  const isDisabled = selectedTags.length < 3;

  useEffect(() => {
    navigation.addListener("beforeRemove", disableNavigation);

    return () => {
      navigation.removeListener("beforeRemove", disableNavigation);
    };
  }, []);

  const handleNext = () => {
    // enable navigation
    navigation.removeListener("beforeRemove", disableNavigation);
    navigation.navigate("Swipe");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <View style={styles.container}>
          <View style={styles.main}>
            <Selected />
          </View>
          <View style={styles.footer}>
            <Button full disabled={isDisabled} onPress={handleNext}>
              <Text>Continue</Text>
            </Button>
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
