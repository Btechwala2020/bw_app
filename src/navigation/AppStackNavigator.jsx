import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PyqSemesterScreen from "../screens/PyqScreen/PyqSemesterScreen";
import PyqSubjectScreen from "../screens/PyqScreen/PyqSubjectScreen";
import PyqPdfListScreen from "../screens/PyqScreen/PyqPdfListScreen";
import TopicsYearLevelScreen from "../screens/Important Topics/TopicsYearLevelScreen";
import AboutUsScreen from "../screens/TermsCond/AboutUsScreen";
import PrivacyPolicyScreen from "../screens/TermsCond/PrivacyPolicyScreen";
import TermsConditionsScreen from "../screens/TermsCond/TermsConditionsScreen";
import DisclaimerScreen from "../screens/TermsCond/DisclaimerScreen";
import ContactUsScreen from "../screens/TermsCond/ContactUsScreen";
import ImportantTopicsScreen from "../screens/Important Topics/ImportantTopicsScreen";
import ImportantTopicsStack from "./ImportantTopicsStack";
import PyqStack from "./PyqStack";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateScreen from "../screens/UpdateScreen";
import AktuResultWebViewScreen from "../screens/AktuResultWebViewScreen";

const Stack = createNativeStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}

      <Stack.Screen name="PyqSemester" component={PyqSemesterScreen} />
      <Stack.Screen name="PyqSubjects" component={PyqSubjectScreen} />
      <Stack.Screen name="PyqPdfList" component={PyqPdfListScreen} />
      <Stack.Screen name="TopicsYearLevel" component={TopicsYearLevelScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="ImportantTopics" component={ImportantTopicsScreen} />
      <Stack.Screen name="ImportantTopicsFlow" component={ImportantTopicsStack} />
      <Stack.Screen name="PyqFlow" component={PyqStack} />
        <Stack.Screen name="Update" component={UpdateScreen} />
      <Stack.Screen
        name="AktuResult"
        component={AktuResultWebViewScreen}
      />

    </Stack.Navigator>
  );
}
