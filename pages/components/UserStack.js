import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Swiper from "../Swiper";
import Profile from "@src/pages/Profile/Profile";
import LikedBy from "@src/pages/LikedBy/LikedBy";

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Quotes">
      <Stack.Screen
        name="Quotes"
        component={Swiper}
        options={{
          headerShown: false, // change this to `false`
        }}
      />
      <Stack.Screen
        name="Liked By"
        component={LikedBy}
        options={{
          headerShown: true, // change this to `false`
        }}
      />
      <Stack.Screen name="User Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default UserStack;
