import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all screens
import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileSetupScreen from "./src/screens/ProfileSetupScreen";
import UpdateScreen from "./src/screens/UpdateScreen"; // ✅ Update screen added
import DrawerNavigatorStyled from "./src/navigation/DrawerNavigatorStyled";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash Screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Auth Screens */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

        {/* Main App (Drawer Navigation) */}
        <Stack.Screen name="App" component={DrawerNavigatorStyled} />

        {/* Update Screen */}
        <Stack.Screen name="Update" component={UpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
