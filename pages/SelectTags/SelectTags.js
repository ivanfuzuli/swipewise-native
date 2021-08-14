import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { Container, View, Text, Spinner, Button } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import Selected from "./components/Selected";
import axios from "../../config/@axios";
import { setHasTags } from "../store/authSlice";
import ErrorMessage from "../../components/ErrorMessage";
import Analytics from "../../config/Analytics";

const disableNavigation = (e) => {
  e.preventDefault();
  return;
};

const BookSelect = ({ navigation }) => {
  const dispatch = useDispatch();

  const selectedTags = useSelector((state) => state.selected.selectedTags);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isDisabled = selectedTags.length < 3;

  useEffect(() => {
    navigation.addListener("beforeRemove", disableNavigation);
    Analytics.track(Analytics.events.SELECT_TAGS_OPENED);
    return () => {
      navigation.removeListener("beforeRemove", disableNavigation);
    };
  }, []);

  const handleNext = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.put("profile/tags", { tags: selectedTags });
      dispatch(setHasTags(true));
      navigation.removeListener("beforeRemove", disableNavigation);
      navigation.navigate("Swipe");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <View style={styles.container}>
          <ErrorMessage message={errorMessage} />
          <View style={styles.main}>
            <Selected />
          </View>
          <View style={styles.footer}>
            <Button
              full
              onPress={handleNext}
              disabled={isLoading || isDisabled}
            >
              {isLoading && <Spinner size={24} color="blue" />}
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
