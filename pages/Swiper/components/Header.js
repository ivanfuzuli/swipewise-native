import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = ({ quote, isEmpty }) => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `"${quote.quote}" by ${quote.author}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.header}>
      {!isEmpty && (
        <TouchableOpacity style={styles.mr10} onPress={handleShare}>
          <Icon name="share" size={32} color="gray" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Icon name="user" size={32} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },

  mr10: {
    marginRight: 10,
  },
});

export default Header;
