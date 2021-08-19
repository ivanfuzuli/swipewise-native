import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../assets/icon.png";

const Header = ({ quote, isEmpty }) => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `A quote for you from swipewise:\n"${quote.quote}" by ${quote.author}`,
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
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    flexGrow: 1,
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  mr10: {
    marginRight: 10,
  },
});

export default Header;
