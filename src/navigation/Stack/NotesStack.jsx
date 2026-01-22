import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NotesYearSelectionScreen from "../../screens/Notes/NotesYearSelectionScreen";
import NotesSubjectScreen from "../../screens/Notes/NotesSubjectScreen";
import NotesTypeScreen from "../../screens/Notes/NotesTypeScreen";
import NotesPdfListScreen from "../../screens/Notes/NotesPdfListScreen";
import PdfViewerScreen from "../../screens/PdfViewerScreen"; // ✅ ADD THIS

const Stack = createNativeStackNavigator();

export default function NotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotesYear" component={NotesYearSelectionScreen} />
      <Stack.Screen name="NotesSubject" component={NotesSubjectScreen} />
      <Stack.Screen name="NotesType" component={NotesTypeScreen} />
      <Stack.Screen name="NotesPdfList" component={NotesPdfListScreen} />
      <Stack.Screen
                          name="PdfViewer"
                          component={PdfViewerScreen}
                        />
    </Stack.Navigator>
  );
}
