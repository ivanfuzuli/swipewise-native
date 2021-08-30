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

import Analytics from "../../config/Analytics";
import env from "../../config/@env";
const API_URL = env.apiUrl;
const GOOGLE_APP_ID = env.googleAppId;

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

const config = {
  clientId: GOOGLE_APP_ID,
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
  redirectUri: API_URL + "/auth/google",
  usePKCE: false,
};

import google from "../../assets/google.logo.png";

const GoogleAuth = ({ title }) => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  const tryLogin = async () => {
    const { token, hasTags } = response.params;
    await SecureStore.setItemAsync("token", token);

    if (parseInt(hasTags) === 0) {
      Analytics.track(Analytics.events.SIGN_UP);
      Analytics.track(Analytics.events.SIGN_UP_WITH_GOOGLE);
    }

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
        <Image style={styles.social} source={google} />
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
    color: "#000",
  },
  social_container: {
    margin: 10,
    borderRadius: 50,
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  social: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 5,
    resizeMode: "contain",
  },
});
export default GoogleAuth;
