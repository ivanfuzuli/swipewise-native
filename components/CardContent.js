import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const CardComponent = ({ profile }) => {
  return (
    <Card style={styles.card}>
      <CardItem body style={{ maxHeight: "80%" }}>
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Helvetica",
            }}
          >
            {profile.desc}
          </Text>
        </ScrollView>
      </CardItem>
      <CardItem footer>
        <Text>
          — {profile.author}, {profile.book}
        </Text>
      </CardItem>
    </Card>
  );
};

CardComponent.propTypes = {
  item: PropTypes.string,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
  },
});

export default CardComponent;
