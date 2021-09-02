import React, { useState } from "react";
import axios from "@src/config/@axios";

import { Alert, StyleSheet, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

import { useDispatch } from "react-redux";
import * as Auth from "../store/authSlice";
import * as SecureStore from "expo-secure-store";

import Analytics from "@src/config/Analytics";
function AppleAuth() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const tryLogin = async ({ token, hasTags }) => {
    await SecureStore.setItemAsync("token", token);

    if (parseInt(hasTags) === 0) {
      Analytics.track(Analytics.events.SIGN_UP);
      Analytics.track(Analytics.events.SIGN_UP_WITH_APPLE);
    }

    dispatch(
      Auth.loginViaToken({
        token,
        hasTags: hasTags === "1" || hasTags === 1,
      })
    );
  };

  const handlePress = async () => {
    try {
      setLoading(true);
      const { authorizationCode } = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      const result = await axios.post("auth/apple", {
        code: authorizationCode,
      });

      const { token, hasTags } = result.data;
      // signed in
      await tryLogin({
        token,
        hasTags,
      });
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        Alert.alert(e.message);
        // handle other errors
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      {isLoading && <View style={styles.loading}></View>}
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={50}
        style={{ width: "100%", height: 54 }}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: 0.3,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 50,
    opacity: 1,
    display: "flex",

    justifyContent: "flex-start",
  },
});
export default AppleAuth;
