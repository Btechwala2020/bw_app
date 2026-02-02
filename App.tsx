import React, { useEffect } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import messaging from "@react-native-firebase/messaging";

import SplashScreen from "./src/screens/SplashScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileSetupScreen from "./src/screens/ProfileSetupScreen";
import UpdateScreen from "./src/screens/UpdateScreen";
import InstagramFollowPopup from "./src/components/InstagramFollowPopup";
import DrawerNavigatorStyled from "./src/navigation/DrawerNavigatorStyled";

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const initFCM = async () => {

      // ✅ Android 13+ system permission
      if (Platform.OS === "android" && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }

      // ✅ Firebase permission
      await messaging().requestPermission();

      // ✅ Get token
      const token = await messaging().getToken();
      console.log("FCM TOKEN:", token);

      // ✅ Subscribe to topic (for broadcast)
      await messaging().subscribeToTopic("all");
    };

    initFCM();

    // ✅ Foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("FOREGROUND MSG:", remoteMessage);
    });

    // ✅ App opened from quit state
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log("OPEN FROM QUIT:", remoteMessage);
      }
    });

    // ✅ App opened from background
    const unsubscribeBackground =
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage) {
          console.log("OPEN FROM BACKGROUND:", remoteMessage);
        }
      });

    // ✅ Token refresh
    const unsubscribeToken = messaging().onTokenRefresh(token => {
      console.log("NEW FCM TOKEN:", token);
    });

    return () => {
      unsubscribe();
      unsubscribeBackground();
      unsubscribeToken();
    };
  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="App" component={DrawerNavigatorStyled} />
        <Stack.Screen name="Update" component={UpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}