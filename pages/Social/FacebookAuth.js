import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text } from "native-base";

import { useAuthRequest } from "expo-auth-session";
import { useDispatch } from "react-redux";
import * as Auth from "../store/authSlice";
import * as SecureStore from "expo-secure-store";

import env from "../../config/@env";
const API_URL = env.apiUrl;
const FB_APP_ID = env.fbAppId;

const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

const config = {
  clientId: FB_APP_ID,
  scopes: ["public_profile"],
  redirectUri: API_URL + "/auth/facebook",
  usePKCE: false,
};

import fb from "../../assets/fb-logo.png";

const FacebookAuth = ({ title }) => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  const tryLogin = async () => {
    const { token, hasTags } = response.params;
    await SecureStore.setItemAsync("token", token);
    dispatch(
      Auth.loginViaToken({
        token,
        hasTags: hasTags === "1",
      })
    );
  };

  useEffect(() => {
    if (response?.type === "success") {
      tryLogin();
    }
  }, [response]);
  const go = async () => {
    await promptAsync();
  };

  return (
    <View>
      <TouchableOpacity onPress={go} style={styles.social_container}>
        <Image style={styles.social} source={fb} />
        <View style={styles.text_container}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  social_container: {
    margin: 10,
    borderRadius: 50,
    backgroundColor: "#3a559f",
    flexDirection: "row",
    justifyContent: "center",
  },
  social: {
    borderRadius: 50,
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
export default FacebookAuth;
