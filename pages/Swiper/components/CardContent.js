import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text, View } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const CardComponent = ({ profile }) => {
  return (
    <View style={{ flex: 1, elevation: 0 }}>
      <Card style={styles.card}>
        <CardItem body style={{ maxHeight: "80%" }}>
          <ScrollView>
            <Text
              style={{
                fontSize: 18,
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
    </View>
  );
};

CardComponent.propTypes = {
  item: PropTypes.string,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    zIndex: 1,
  },
});

export default CardComponent;
