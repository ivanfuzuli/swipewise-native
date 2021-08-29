import React, { useState } from "react";
import { Text, View } from "react-native";
import { ButtonGroup } from "react-native-elements";

const Order = ({ setOrder }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const updateIndex = (index) => {
    if (index === selectedIndex) {
      return;
    }

    if (index === 0) {
      setOrder("popular");
    } else {
      setOrder("newest");
    }

    setSelectedIndex(index);
  };
  const buttons = ["Most Liked", "Newest"];

  return (
    <View style={{ flexDirection: "column" }}>
      <View>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
      </View>
    </View>
  );
};

export default Order;
