import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import ShareContainer from "./ShareContainer";
import LikedByAvatars from "./LikedByAvatars";

const CardComponent = ({ quote }) => {
  return (
    <View style={{ flex: 1, elevation: 0 }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <ShareContainer quote={quote} />
        </View>
        <View style={styles.content}>
          <ScrollView>
            <Text style={styles.quote}>{quote.quote}</Text>
          </ScrollView>
          <View>
            <Text>
              — {quote.author}
              {quote.title && ", "}
              {quote.title}
            </Text>
          </View>
        </View>
        <View>
          <LikedByAvatars
            users={quote.liked_by}
            id={quote._id}
            count={quote.liked_by_count}
          />
        </View>
      </View>
    </View>
  );
};

CardComponent.propTypes = {
  item: PropTypes.string,
};

const styles = StyleSheet.create({
  mr10: {
    marginRight: 10,
  },
  quote: {
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  card: {
    borderWidth: 1,
    borderColor: "#d1d1d1",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    justifyContent: "space-between",
    zIndex: 1,
  },

  content: {
    marginBottom: 0,
    maxHeight: "80%",
  },
});

export default CardComponent;
