import React from "react";
import Landing from "./pages/Landing";
import Swiper from "./pages/Swiper";
import Login from "./pages/Login";
import SelectTags from "./pages/SelectTags";

import Settings from "./pages/Settings";
import ChangeEmail from "./pages/Settings/ChangeEmail";
import ChangePassword from "./pages/Settings/ChangePassword";

import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { navigationRef } from "./RootNavigation";
const Stack = createStackNavigator();

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <Stack.Navigator initialRouteName="Swipe">
          <Stack.Screen
            name="Select Books"
            component={SelectTags}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen
            name="Swipe"
            component={Swiper}
            options={{
              headerShown: false, // change this to `false`
            }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Change Email" component={ChangeEmail} />
          <Stack.Screen name="Change Password" component={ChangePassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Landing}
            options={{
              headerShown: false, // change this to `false`
            }}
          />

          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
