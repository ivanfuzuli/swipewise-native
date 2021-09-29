import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "@src/pages/Profile/Profile";
import { AntDesign } from "@expo/vector-icons";
import UserStack from "./UserStack";

const Tab = createBottomTabNavigator();

export default function BottomBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home": {
              iconName = focused ? "home" : "home";
              break;
            }
            case "Profile": {
              iconName = focused ? "user" : "user";
              break;
            }
          }
          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={UserStack}
        options={{
          headerShown: false, // change this to `false`
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false, // change this to `false`
        }}
      />
    </Tab.Navigator>
  );
}
