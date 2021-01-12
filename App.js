import "react-native-gesture-handler";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";

import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Root } from "native-base";

import Landing from "./pages/Landing";
import Swiper from "./pages/Swiper";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Stack = createStackNavigator();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      if (isLoadingComplete) return;
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}
