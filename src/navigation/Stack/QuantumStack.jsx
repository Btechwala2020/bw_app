import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuantumYearLevelScreen from "../../screens/Quantum/QuantumYearLevelScreen";
import QuantumPdfListScreen from "../../screens/Quantum/QuantumPdfListScreen";

const Stack = createNativeStackNavigator();

export default function QuantumStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuantumYearLevel" component={QuantumYearLevelScreen} />
      <Stack.Screen name="QuantumPdfList" component={QuantumPdfListScreen} />
    </Stack.Navigator>
  );
}
