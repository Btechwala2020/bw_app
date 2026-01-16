import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopicsYearLevelScreen from "../../screens/Important Topics/TopicsYearLevelScreen";
import ImportantTopicsScreen from "../../screens/Important Topics/ImportantTopicsScreen";
import PdfViewerScreen from "../../screens/PdfViewerScreen"; // ✅ ADD THIS

const Stack = createNativeStackNavigator();

export default function ImportantTopicsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TopicsYearLevel"
        component={TopicsYearLevelScreen}
      />

      <Stack.Screen
        name="ImportantTopics"
        component={ImportantTopicsScreen}
      />

      {/* ✅ PDF VIEWER */}
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
      />
    </Stack.Navigator>
  );
}
