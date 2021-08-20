import React, { useEffect } from "react";
import axios from "../../config/@axios";

import { View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

function AppleAuth() {
  useEffect(() => {
    (async () => {
      try {
        await axios.post("auth/apple");
      } catch (e) {
        console.log("e", e);
      }
    })();
  });

  return (
    <View style={{ margin: 10 }}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={50}
        style={{ width: "100%", height: 54 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            console.log(credential);
            await axios.post("auth/apple", credential);
            // signed in
          } catch (e) {
            if (e.code === "ERR_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              console.log(e);
              // handle other errors
            }
          }
        }}
      />
    </View>
  );
}

export default AppleAuth;
