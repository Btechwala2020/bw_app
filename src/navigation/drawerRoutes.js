// src/navigation/drawerRoutes.js

import HomeScreen from "../screens/HomeScreen";
import PyqSemesterScreen from "../screens/PyqScreen/PyqSemesterScreen";
import QuantumYearLevelScreen from "../screens/Quantum/QuantumYearLevelScreen";
import TopicsYearLevelScreen from "../screens/Important Topics/TopicsYearLevelScreen";

import AboutUsScreen from "../screens/TermsCond/AboutUsScreen";
import PrivacyPolicyScreen from "../screens/TermsCond/PrivacyPolicyScreen";
import TermsConditionsScreen from "../screens/TermsCond/TermsConditionsScreen";
import DisclaimerScreen from "../screens/TermsCond/DisclaimerScreen";
import ContactUsScreen from "../screens/TermsCond/ContactUsScreen";

export const DRAWER_ROUTES = [
  {
    name: "Home",
    label: "Home",
    icon: "home-outline",
    component: HomeScreen,
  },
  {
    name: "PyqSemester",
    label: "Previous Year Papers",
    icon: "document-text-outline",
    component: PyqSemesterScreen,
  },
  {
    name: "PyqSubjects",
    label: "PYQ Subjects",
    icon: "book-outline",
    component: require('../screens/PyqScreen/PyqSubjectScreen').default,
    hidden: true,
  },
  {
    name: "PyqPdfList",
    label: "PYQ PDFs",
    icon: "document-text-outline",
    component: require('../screens/PyqScreen/PyqPdfListScreen').default,
    hidden: true,
  },
  {
    name: "TopicsYearLevel",
    label: "Important Topics",
    icon: "bulb-outline",
    component: TopicsYearLevelScreen,
  },

  // STATIC / PLAY STORE PAGES
  {
    name: "AboutUs",
    label: "About Us",
    icon: "information-circle-outline",
    component: AboutUsScreen,
  },
  {
    name: "PrivacyPolicy",
    label: "Privacy Policy",
    icon: "shield-checkmark-outline",
    component: PrivacyPolicyScreen,
  },
  {
    name: "ContactUs",
    label: "Contact Us",
    icon: "mail-outline",
    component: ContactUsScreen,
  },
  {
    name: "Disclaimer",
    label: "Disclaimer",
    icon: "alert-circle-outline",
    component: DisclaimerScreen,
  },
  {
    name: "TermsConditions",
    label: "Terms & Conditions",
    icon: "document-outline",
    component: TermsConditionsScreen,
  },
];
