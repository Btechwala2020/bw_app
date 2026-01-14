import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesYearSelectionScreen from "../../screens/Notes/NotesYearSelectionScreen";
import NotesSubjectSelectScreen from "../../screens/Notes/NotesSubjectSelectScreen";
import NotesScreen from "../../screens/Notes/NotesScreen";

const Stack = createNativeStackNavigator();

export default function NotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotesYearSelection" component={NotesYearSelectionScreen} />
      <Stack.Screen name="NotesSubjectSelect" component={NotesSubjectSelectScreen} />
      <Stack.Screen name="NotesScreen" component={NotesScreen} />
    </Stack.Navigator>
  );
}
