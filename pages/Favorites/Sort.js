import React from "react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";

const Order = ({ setSort, sort }) => {
  let selectedIndex = 1;
  if (sort === "popular") {
    selectedIndex = 0;
  }

  const updateIndex = (index) => {
    if (index === selectedIndex) {
      return;
    }

    if (index === 0) {
      setSort("popular");
    } else {
      setSort("newest");
    }
  };
  const buttons = ["Most Popular", "Newest"];

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
