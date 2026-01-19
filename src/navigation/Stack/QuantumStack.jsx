import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuantumYearLevelScreen from "../../screens/Quantum/QuantumYearLevelScreen";
import QuantumPdfListScreen from "../../screens/Quantum/QuantumPdfListScreen";
import PdfViewerScreen from "../../screens/PdfViewerScreen"; // ✅ ADD THIS

const Stack = createNativeStackNavigator();

export default function QuantumStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="QuantumYearLevel"
        component={QuantumYearLevelScreen}
      />

      {/* 🔥 SINGLE SOURCE OF TRUTH */}
      <Stack.Screen
        name="QuantumTopics"
        component={QuantumPdfListScreen}
      />
      <Stack.Screen
              name="PdfViewer"
              component={PdfViewerScreen}
            />
    </Stack.Navigator>
  );
}
