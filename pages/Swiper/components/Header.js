import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "@src/assets/icon.png";

import openShare from "@src/utils/openShare";
import { useDispatch } from "react-redux";
import { setShareInstagramOpen } from "@src/pages/store/statusSlice";
import ClapsSvg from "./svgs/ClapsSvg";

const Header = ({ quote, isEmpty }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const openInstagramShare = () => {
    dispatch(setShareInstagramOpen(true));
  };

  const handleShare = () => {
    openShare(quote.author, quote.title, quote.quote);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.mr10}
          onPress={() => navigation.navigate("Favourites")}
        ></TouchableOpacity>
        {!isEmpty && (
          <>
            <TouchableOpacity style={styles.mr10} onPress={handleShare}>
              <Icon name="share" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mr10} onPress={openInstagramShare}>
              <Icon name="instagram" size={32} color="gray" />
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate("Favorites")}
        >
          <View
            style={{
              height: 32,
              width: 32,
            }}
          >
            <ClapsSvg color="#000" />
          </View>
        </TouchableOpacity>
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
