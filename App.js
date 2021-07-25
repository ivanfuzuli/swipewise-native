import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";

import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Root } from "native-base";

import Landing from "./pages/Landing";
import Swiper from "./pages/Swiper";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectTags from "./pages/SelectTags";

import Settings from "./pages/Settings";
import ChangeEmail from "./pages/Settings/ChangeEmail";
import ChangePassword from "./pages/Settings/ChangePassword";

import { Provider } from "react-redux";
import store from "./store";

const Stack = createStackNavigator();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  async function loadResourcesAndDataAsync() {
    if (isLoadingComplete) return;
    try {
      // Load fonts
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    }
  }

  const loadingComplete = () => setLoadingComplete(true);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAndDataAsync}
        onFinish={loadingComplete}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Root>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Landing}
              options={{
                headerShown: false, // change this to `false`
              }}
            />
            <Stack.Screen
              name="Swipe"
              component={Swiper}
              options={{
                headerShown: false, // change this to `false`
              }}
            />
            <Stack.Screen name="Sign up" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Select Books" component={SelectTags} />

            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Change Email" component={ChangeEmail} />
            <Stack.Screen name="Change Password" component={ChangePassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
}
