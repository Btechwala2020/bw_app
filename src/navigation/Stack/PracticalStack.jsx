import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PracticalFilesScreen from "../../screens/Practicalfiles/PracticalFilesScreen";
import PracticalYearSelectionScreen from "../../screens/Practicalfiles/PracticalYearSelectionScreen";

const Stack = createNativeStackNavigator();

export default function PracticalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PracticalYearSelection" component={PracticalYearSelectionScreen} />
      <Stack.Screen name="PracticalFiles" component={PracticalFilesScreen} />
    </Stack.Navigator>
  );
}
