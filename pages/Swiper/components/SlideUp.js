import React, { useState, useRef } from "react";
import { SwipeablePanel } from "rn-swipeable-panel";
import { View, Text } from "react-native";
import ViewShot from "react-native-view-shot";

import { useSelector } from "react-redux";
import { Button } from "native-base";
import Share from "react-native-share";
import RNFS from "react-native-fs";

import { image1 } from "./images";

const SlideUp = () => {
  const captureRef = useRef(null);

  const quotes = useSelector((state) => state.quotes.items);
  const currentIndex = useSelector((state) => state.quotes.currentIndex);
  const currentQuote = quotes[currentIndex];

  const [isOpen, setOpen] = useState(true);

  const share = (uri) => {
    RNFS.readFile(uri, "base64").then((res) => {
      let urlString = "data:image/jpeg;base64," + res;
      let options = {
        url: image1,
        social: Share.Social.INSTAGRAM,
        type: "image/png",
      };
      console.log("res", urlString);
      Share.shareSingle(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    });
  };

  const handleCapture = () => {
    captureRef.current.capture({}).then((uri) => {
      share(uri);
    });
  };

  if (!currentQuote) {
    return null;
  }
  return (
    <SwipeablePanel
      openLarge
      showCloseButton
      onClose={() => setOpen(false)}
      fullWidth
      isActive={isOpen}
    >
      <>
        <View>
          <Button onPress={handleCapture}>
            <Text>Take Photo</Text>
          </Button>
        </View>
        <ViewShot ref={captureRef} options={{ format: "jpg", quality: 0.9 }}>
          <View>
            <Text>{currentQuote.quote}</Text>
            <Text>{currentQuote.author}</Text>
          </View>
        </ViewShot>
      </>
    </SwipeablePanel>
  );
};

export default SlideUp;
