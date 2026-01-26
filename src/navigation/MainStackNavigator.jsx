import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import ProfileSetupScreen from "../screens/ProfileSetupScreen";
import UpdateScreen from "../screens/UpdateScreen";
import DrawerNavigatorStyled from "./DrawerNavigatorStyled";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* Splash */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      {/* Sign In */}
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
      />

      {/* Profile Setup (mobile + year) */}
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetupScreen}
      />

      {/* Main App (Drawer) */}
      <Stack.Screen
        name="App"
        component={DrawerNavigatorStyled}
      />
      {/* Update Screen */}
      <Stack.Screen
        name="Update"
        component={UpdateScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
