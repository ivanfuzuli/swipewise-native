import React, { useState } from "react";
import axios from "../../config/@axios";

import { SafeAreaView } from "react-native";
import { Button, Text, Container, Toast } from "native-base";

import Selected from "../SelectTags/components/Selected";
import ErrorMessage from "../../components/ErrorMessage";

import { useSelector } from "react-redux";

const ChangeTags = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const selectedTags = useSelector((state) => state.selected.selectedTags);

  const isDisabled = selectedTags.length < 3;

  const handleNext = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.put("profile/tags", { tags: selectedTags });
      Toast.show({
        text: "Your tags successfully changed!",
        duration: 5000,
        buttonText: "Okay",
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ flex: 1 }}>
      <ErrorMessage message={errorMessage} />
      <Selected />
      <SafeAreaView style={{ justifyContent: "center", flexDirection: "row" }}>
        <Button onPress={handleNext} disabled={isLoading || isDisabled}>
          <Text>Continue</Text>
        </Button>
      </SafeAreaView>
    </Container>
  );
};

export default ChangeTags;
