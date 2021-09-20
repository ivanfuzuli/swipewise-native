import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const CardComponent = ({ quote }) => {
  return (
    <View style={{ flex: 1, elevation: 0 }}>
      <View style={styles.card}>
        <View>
          <ScrollView>
            <Text
              style={{
                fontSize: 24,
              }}
            >
              {quote.quote}
            </Text>
          </ScrollView>
        </View>
        <View footer>
          <Text>
            — {quote.author}
            {quote.title && ", "}
            {quote.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

CardComponent.propTypes = {
  item: PropTypes.string,
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    zIndex: 1,
  },
});

export default CardComponent;
