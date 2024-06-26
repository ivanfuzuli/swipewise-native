import env from "../../config/@environment";

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

import Quotes from "./components/Quotes";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getQuotes, setLoading } from "../store/statusSlice";
import { dequeue } from "../store/votesSlice";

import ErrorView from "./components/ErrorView";

let timer = null;
const WAIT_UNTIL = 3000;

export default function App({ navigation }) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.status.loading);
  const errorMessage = useSelector((state) => state.status.error);

  const quotes = useSelector((state) => state.quotes.items);
  const lastSync = useSelector((state) => state.quotes.lastSync);
  const hasTags = useSelector((state) => state.auth.hasTags);

  const [isTimerActive, setTimerActive] = useState(false);
  useEffect(() => {
    (async () => {
      if (!hasTags) {
        navigation.navigate("Select Genres");
      } else {
        const now = Date.now();
        const waitTimeInMs = env.waitTimeInMinutes * 60 * 1000;
        const diff = now - waitTimeInMs;

        if (lastSync && lastSync > diff) {
          dispatch(setLoading(false));
          return;
        }

        setTimerActive(true);
        timer = setTimeout(() => {
          setTimerActive(false);
        }, WAIT_UNTIL);
        await dispatch(dequeue());
        await dispatch(getQuotes());
      }
    })();

    return () => {
      clearTimeout(timer);
    };
  }, [hasTags]);

  if (!hasTags) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text>Please select at least 3 tags.</Text>
        </View>
      </View>
    );
  }

  if (errorMessage) {
    return <ErrorView />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {(isLoading || isTimerActive) && <Loading />}
      {!isLoading && !isTimerActive && <Quotes {...{ navigation, quotes }} />}
    </View>
  );
}
