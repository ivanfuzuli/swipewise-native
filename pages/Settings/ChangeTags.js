import React, { useEffect, useState } from "react";
import axios from "../../config/@axios";

import { SafeAreaView, View } from "react-native";
import { Button } from "react-native-elements";

import Selected from "../SelectTags/components/Selected";
import ErrorMessage from "../../components/ErrorMessage";
import Toast from "react-native-root-toast";

import { useDispatch, useSelector } from "react-redux";
import { resetTags } from "../SelectTags/store/selectedSlice";

const ChangeTags = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const selectedTags = useSelector((state) => state.selected.selectedTags);

  const isDisabled = selectedTags.length < 3;

  const handleNext = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.put("profile/tags", { tags: selectedTags });
      Toast.show("Your tags successfully changed!", {
        duration: Toast.durations.LONG,
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(resetTags());

    return () => {
      dispatch(resetTags());
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ErrorMessage message={errorMessage} />
      <Selected />
      <SafeAreaView style={{ justifyContent: "center", flexDirection: "row" }}>
        <Button
          onPress={handleNext}
          title="Continue"
          disabled={isLoading || isDisabled}
          loading={isLoading}
        ></Button>
      </SafeAreaView>
    </View>
  );
};

export default ChangeTags;
