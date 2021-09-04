import React from "react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";

const Filter = ({ setFilter, filter }) => {
  let selectedIndex = 0;
  if (filter === "day") {
    selectedIndex = 0;
  }

  if (filter === "week") {
    selectedIndex = 1;
  }

  if (filter === "month") {
    selectedIndex = 2;
  }

  if (filter === "all") {
    selectedIndex = 3;
  }

  const updateIndex = (index) => {
    if (index === selectedIndex) {
      return;
    }

    switch (index) {
      case 0:
        setFilter("day");
        break;
      case 1:
        setFilter("week");
        break;
      case 2:
        setFilter("month");
        break;
      case 3:
        setFilter("all");
        break;
    }
  };

  const buttons = ["Today", "This Week", "This Month", "All Times"];

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

export default Filter;
