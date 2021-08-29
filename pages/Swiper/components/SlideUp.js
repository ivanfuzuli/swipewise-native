import React, { useRef, useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import ViewShot from "react-native-view-shot";
import LinearGradient from "react-native-linear-gradient";

import { useSelector, useDispatch } from "react-redux";
import { setShareInstagramOpen } from "../../store/statusSlice";
import { Button, Text, View } from "native-base";
import Share from "react-native-share";

const { height } = Dimensions.get("window");
const width = height * (9 / 16);

const SlideUp = () => {
  const dispatch = useDispatch();

  const [activeColor, setActiveColor] = useState("blue");
  const captureRef = useRef(null);
  const translateY = useRef(new Animated.Value(height));
  const quotes = useSelector((state) => state.quotes.items);
  const currentIndex = useSelector((state) => state.quotes.currentIndex);
  const quote = quotes[currentIndex];

  const closeShare = () => {
    dispatch(setShareInstagramOpen(false));
  };

  const colors = {
    blue: ["#4c669f", "#3b5998", "#192f6a"],
    pink: ["#bc4e9c", "#f80759"],
    green: ["#5A3F37", "#2C7744"],
  };

  const changeColor = (color) => {
    setActiveColor(color);
  };

  const share = (uri) => {
    let urlString = "data:image/jpeg;base64," + uri;
    let options = {
      url: urlString,
      social: Share.Social.INSTAGRAM,
      type: "image/jpeg",
      saveToFiles: false,
    };

    Share.shareSingle(options)
      .then((res) => {
        closeShare();
      })
      .catch((err) => {
        Alert.alert("Please give photo write access to swipewise.");
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
          colors={colors[activeColor]}
          style={styles.linearGradient}
        >
          <ScrollView
            style={styles.card}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
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
          </ScrollView>

          <View style={styles.logoContainer}>
            <Text style={styles.logo}>@swipewisdom</Text>
          </View>
        </LinearGradient>
      </ViewShot>
      <SafeAreaView
        style={{
          flexDirection: "column",
          marginBottom: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.colors}>
          <TouchableOpacity onPress={() => changeColor("green")}>
            <View
              style={[
                styles.green,
                styles.color,
                activeColor === "green" && styles.activeColor,
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeColor("pink")}>
            <View
              style={[
                styles.pink,
                styles.color,
                activeColor === "pink" && styles.activeColor,
              ]}
            ></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeColor("blue")}>
            <View
              style={[
                styles.blue,
                styles.color,
                activeColor === "blue" && styles.activeColor,
              ]}
            ></View>
          </TouchableOpacity>
        </View>
        <View>
          <Button success rounded onPress={handleCapture}>
            <Text>
              <Icon name="share" size={24} color="white" />
              Share
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  activeColor: {
    borderWidth: 2,
    borderColor: "white",
  },
  color: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginRight: 10,
  },
  colors: {
    opacity: 0.6,
    flexDirection: "row",
    marginBottom: 15,
  },
  green: {
    backgroundColor: "#2C7744",
  },
  blue: {
    backgroundColor: "blue",
  },
  pink: {
    backgroundColor: "#f80759",
  },
  card: {
    flex: 1,
    zIndex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: "10%",
    marginBottom: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: width,
  },

  linearGradient: {
    flex: 1,
    minHeight: height,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  logo: {
    color: "#fe4b00",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default SlideUp;
