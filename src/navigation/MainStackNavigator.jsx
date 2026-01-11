import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DRAWER_ROUTES } from "./drawerRoutes";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Drawer ka header use hoga
      }}
    >
      {DRAWER_ROUTES.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}
