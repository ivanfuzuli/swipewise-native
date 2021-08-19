import env from "../../../config/@env";
import Analytics from "../../../config/Analytics";
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View, Text } from "native-base";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { getQuotes } from "../../store/statusSlice";

const { width } = Dimensions.get("window");

const getDiff = (lastSync) => {
  const now = Date.now();
  const waitTimeInMs = env.waitTimeInMinutes * 60 * 1000;
  const diff = waitTimeInMs - (now - lastSync);
  if (diff < 0) {
    return 0;
  }

  return diff;
};

const Empty = () => {
  const dispatch = useDispatch();
  const lastSync = useSelector((state) => state.quotes.lastSync);
  const initialTime = new Date(getDiff(lastSync)).toISOString().substr(11, 8);
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    Analytics.track(Analytics.events.EMPTY_PAGE_OPENED);

    const interval = setInterval(() => {
      const diff = getDiff(lastSync);
      if (diff <= 0) {
        clearInterval(interval);
        dispatch(getQuotes());
        Analytics.track(Analytics.events.TIME_UP);

        return;
      }

      const time = new Date(diff).toISOString().substr(11, 8);
      setTime(time);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rest Time...</Text>
      <LottieView
        style={styles.animation}
        source={require("../../../assets/yoga.json")}
        autoPlay
        loop
      />
      <Text style={styles.time}>{time}</Text>
      <Text> remaining to new quotes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    position: "relative",
    width: width,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    width: width,
    marginLeft: 16,
    borderRadius: 50,
    alignItems: "center",
  },

  heading: {
    fontWeight: "bold",
  },

  time: {
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default Empty;
