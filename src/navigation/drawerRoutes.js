import HomeScreen from "../screens/HomeScreen";
import AboutUsScreen from "../screens/TermsCond/AboutUsScreen";
import PrivacyPolicyScreen from "../screens/TermsCond/PrivacyPolicyScreen";
import TermsConditionsScreen from "../screens/TermsCond/TermsConditionsScreen";
import DisclaimerScreen from "../screens/TermsCond/DisclaimerScreen";
import ContactUsScreen from "../screens/TermsCond/ContactUsScreen";
import PyqStack from "./PyqStack";
import ImportantTopicsStack from "./ImportantTopicsStack";
import QuantumStack from "./QuantumStack";

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
    component: PyqStack,
  },
  {
    name: "TopicsYearLevel",
    label: "Important Topics",
    icon: "bulb-outline",
    component: ImportantTopicsStack,
  },
  {
    name: "QuantumYearLevel",
    label: " Latest Quantum",
    icon: "layers-outline",
    component: QuantumStack,
  },
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