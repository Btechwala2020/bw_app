import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DRAWER_ROUTES } from "./drawerRoutes.js";
import TopNavbar from "../components/navigation/TopNavbar";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route, options, back }) => {
          const routeConfig = DRAWER_ROUTES.find(r => r.name === route.name);
          const title = routeConfig?.label || route.name;
          return (
            <TopNavbar title={title} showBack={!!back} />
          );
        },
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
