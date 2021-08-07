import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Text } from "native-base";

import Constants from "expo-constants";
import { maybeCompleteAuthSession } from "expo-web-browser";
import {
  useAuthRequest,
  makeRedirectUri,
  AuthRequestConfig,
  DiscoveryDocument,
} from "expo-auth-session";

maybeCompleteAuthSession();
const useProxy = Constants.appOwnership === "expo";

const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

const redirectUri = makeRedirectUri({
  native: "fb580899039611484://authorize",
  useProxy,
});

const config = {
  clientId: "580899039611484",
  scopes: ["public_profile"],
  redirectUri,
  extraParams: { display: Platform.select({ web: "popup" }) },
};

import fb from "../../assets/fb-logo.png";
const { width } = Dimensions.get("window");

const FacebookAuth = () => {
  const [request, response, promptAsync] = useAuthRequest(config, discovery);
  const go = async () => {
    await promptAsync({ useProxy });
  };
  return (
    <View>
      <TouchableOpacity onPress={go} style={styles.social_container}>
        <Image style={styles.social} source={fb} />
        <View style={styles.text_container}>
          <Text style={styles.text}>Sign In with Facebook</Text>
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
