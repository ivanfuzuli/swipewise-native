import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { Text } from "native-base";
import axios from "@src/config/@axios";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { useDispatch } from "react-redux";
import * as Auth from "../store/authSlice";
import * as SecureStore from "expo-secure-store";

import Analytics from "../../config/Analytics";
import env from "../../config/@env";
import google from "../../assets/google.logo.png";

const API_URL = env.apiUrl;
const GOOGLE_APP_ID = env.googleAppId;

GoogleSignin.configure({
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId: GOOGLE_APP_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: API_URL, // specifies a hosted domain restriction
  loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "Swipewise", // [Android] specifies an account name on the device that should be used
  // iosClientId: "com.can.swipewise", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: "", // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});

const GoogleAuth = ({ title }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const tryLogin = async ({ token, hasTags }) => {
    await SecureStore.setItemAsync("token", token);

    if (parseInt(hasTags) === 0) {
      Analytics.track(Analytics.events.SIGN_UP);
      Analytics.track(Analytics.events.SIGN_UP_WITH_GOOGLE);
    }

    dispatch(
      Auth.loginViaToken({
        token,
        hasTags: parseInt(hasTags) === 1,
      })
    );
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;

      const result = await axios.post("auth/google", {
        token: idToken,
      });

      const { token, hasTags } = result.data;
      // signed in
      await tryLogin({
        token,
        hasTags,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Google Play service is not available!");
        // play services not available or outdated
      } else {
        // some other error happened
        Alert.alert("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {isLoading && <View style={styles.loading}></View>}

      <TouchableOpacity onPress={signIn} style={styles.social_container}>
        <Image style={styles.social} source={google} />
        <View style={styles.text_container}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
  text_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 20,
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
