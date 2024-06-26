import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "@src/pages/Profile/Profile";

import { AntDesign } from "@expo/vector-icons";
import QuoteStack from "./QuoteStack";
import FeedStack from "./FeedStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
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
            case "Feed": {
              iconName = focused ? "inbox" : "inbox";
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
        component={QuoteStack}
        options={{
          headerShown: false, // change this to `false`
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedStack}
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
