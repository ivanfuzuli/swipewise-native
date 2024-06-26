import React from "react";
import Landing from "./pages/Landing";

import Login from "./pages/Login";
import SelectTags from "./pages/SelectTags";

import Settings from "./pages/Settings";
import ChangeEmail from "./pages/Settings/ChangeEmail";
import ChangePassword from "./pages/Settings/ChangePassword";
import ChangeUsername from "./pages/Settings/ChangeUsername";
import DeleteAccount from "./pages/Settings/DeleteAccount";
import ChangeTags from "./pages/Settings/ChangeTags";
import Feedback from "./pages/Settings/Feedback";
import Favorites from "./pages/Favorites/Favorites";

import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { navigationRef } from "./RootNavigation";
import BottomTabs from "./pages/components/BottomTabs";
const Stack = createStackNavigator();

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedIn ? (
        <Stack.Navigator initialRouteName="Swipe">
          <Stack.Screen
            name="Swipe"
            component={BottomTabs}
            options={{
              headerShown: false, // change this to `false`
            }}
          />
          <Stack.Screen
            name="Select Genres"
            component={SelectTags}
            options={{ headerLeft: () => null }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Change Email" component={ChangeEmail} />
          <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="Change Username" component={ChangeUsername} />
          <Stack.Screen name="Change Tags" component={ChangeTags} />
          <Stack.Screen name="Delete Account" component={DeleteAccount} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Favorites" component={Favorites} />
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
