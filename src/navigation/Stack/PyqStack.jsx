import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PyqSemesterScreen from "../../screens/PyqScreen/PyqSemesterScreen";
import PyqSubjectScreen from "../../screens/PyqScreen/PyqSubjectScreen";
import PyqPdfListScreen from "../../screens/PyqScreen/PyqPdfListScreen";

const Stack = createNativeStackNavigator();

export default function PyqStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PyqSemester" component={PyqSemesterScreen} />
      <Stack.Screen name="PyqSubjects" component={PyqSubjectScreen} />
      <Stack.Screen name="PyqPdfList" component={PyqPdfListScreen} />
    </Stack.Navigator>
  );
}
