import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* SCREENS */
import PyqSemesterScreen from "../../screens/PyqScreen/PyqSemesterScreen";
import PyqSubjectScreen from "../../screens/PyqScreen/PyqSubjectScreen";
import PyqSemesterPicker from "../../screens/PyqScreen/PyqSemesterPicker"; // ⭐ ADD THIS
import PyqPdfListScreen from "../../screens/PyqScreen/PyqPdfListScreen";
import PdfViewerScreen from "../../screens/PdfViewerScreen";

const Stack = createNativeStackNavigator();

export default function PyqStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* ENTRY */}
      <Stack.Screen
        name="PyqSemester"
        component={PyqSemesterScreen}
      />

      {/* SUBJECT LIST */}
      <Stack.Screen
        name="PyqSubjects"
        component={PyqSubjectScreen}
      />

      {/* ⭐ SEMESTER PICKER (NEW FLOW) */}
   <Stack.Screen
  name="PyqSemesterPicker"
  component={PyqSemesterPicker}
  options={{ presentation: "modal" }}
/>
<Stack.Screen name="PyqPdfList" component={PyqPdfListScreen} />

      {/* PDF VIEWER */}
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
      />
    </Stack.Navigator>
  );
}
