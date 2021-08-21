import React, { useRef, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ViewShot from "react-native-view-shot";
import LinearGradient from "react-native-linear-gradient";

import { useSelector, useDispatch } from "react-redux";
import { setShareInstagramOpen } from "../../store/statusSlice";
import { Button, Text, View, Card, CardItem } from "native-base";
import Share from "react-native-share";
import RNFS from "react-native-fs";

const { height } = Dimensions.get("window");

const SlideUp = () => {
  const dispatch = useDispatch();
  const captureRef = useRef(null);
  const translateY = useRef(new Animated.Value(height));
  const quotes = useSelector((state) => state.quotes.items);
  const currentIndex = useSelector((state) => state.quotes.currentIndex);
  const quote = quotes[currentIndex];

  const closeShare = () => {
    dispatch(setShareInstagramOpen(false));
  };

  const share = (uri) => {
    RNFS.readFile(uri, "base64").then((res) => {
      let urlString = "data:image/jpeg;base64," + res;
      let options = {
        url: urlString,
        social: Share.Social.INSTAGRAM,
        type: "image/jpeg",
        saveToFiles: false,
      };

      Share.shareSingle(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          Alert.alert("Please give photo write access to swipewise.");
        });
    });
  };

  useEffect(() => {
    Animated.timing(translateY.current, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCapture = () => {
    captureRef.current.capture({}).then((uri) => {
      share(uri);
    });
  };

  if (!quote) {
    return null;
  }

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        transform: [
          {
            translateY: translateY.current,
          },
        ],
      }}
    >
      <View style={{ position: "absolute", top: 50, right: 20, zIndex: 2 }}>
        <TouchableOpacity onPress={closeShare}>
          <AntDesign name="closecircleo" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ViewShot
        ref={captureRef}
        style={{ flex: 1 }}
        options={{ format: "jpg", quality: 1, result: "base64" }}
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.linearGradient}
        >
          <View style={styles.card}>
            <Text
              style={{
                fontSize: 24,
                color: "#fff",
              }}
            >
              {quote.quote}
            </Text>
            <View>
              <Text style={{ color: "#fff" }}>
                — {quote.author}
                {quote.title && ", "}
                {quote.title}
              </Text>
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>@swipewisedom</Text>
          </View>
        </LinearGradient>
      </ViewShot>
      <SafeAreaView
        style={{
          flexDirection: "row",
          marginBottom: 5,
          justifyContent: "center",
        }}
      >
        <Button success rounded onPress={handleCapture}>
          <Text>
            <Icon name="share" size={24} color="white" />
            Share
          </Text>
        </Button>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    zIndex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
  },

  linearGradient: { flex: 1, minHeight: height },
  logoContainer: {
    marginBottom: 10,
    marginRight: 20,
  },

  logo: {
    color: "#fe4b00",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default SlideUp;
