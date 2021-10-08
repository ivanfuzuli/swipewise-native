import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "@src/pages/Profile/Profile";
import Feed from "../Feed/Feed";

const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed List">
      <Stack.Screen
        name="Feed List"
        component={Feed}
        options={{
          title: "Feed",
        }}
      />
      <Stack.Screen
        name="Feed Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true, // change this to `false`
        }}
      />
      <Stack.Screen name="User Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default FeedStack;
