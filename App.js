import "react-native-gesture-handler";
import React from "react";
import { Container } from "native-base";
import Landing from "./pages/Landing";
import Swiper from "./pages/Swiper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Landing} />
        <Stack.Screen name="Swipe" component={Swiper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
