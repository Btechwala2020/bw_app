import HomeScreen from "../screens/HomeScreen.jsx";

import NotesStack from "./Stack/NotesStack";
import PracticalStack from "./Stack/PracticalStack";
import PyqStack from "./Stack/PyqStack";
import ImportantTopicsStack from "./Stack/ImportantTopicsStack";
import QuantumStack from "./Stack/QuantumStack";
import ProfileScreen from "../screens/ProfileScreen.jsx";


import AboutUsScreen from "../screens/TermsCond/AboutUsScreen.jsx";
import PrivacyPolicyScreen from "../screens/TermsCond/PrivacyPolicyScreen.jsx";
import TermsConditionsScreen from "../screens/TermsCond/TermsConditionsScreen.jsx";
import DisclaimerScreen from "../screens/TermsCond/DisclaimerScreen.jsx";
import ContactUsScreen from "../screens/TermsCond/ContactUsScreen.jsx";
import AktuResultWebViewScreen from "../screens/AktuResultWebViewScreen";


export const DRAWER_ROUTES = [
  
  {
    name: "Home",
    label: "Home",
    icon: "home-outline",
    component: HomeScreen,
  },
   {
  name: "Profile",
  label: "My Profile",
  icon: "person-outline",
  component: ProfileScreen,
},


  {
    name: "Notes",
    label: "Quality Notes",
    icon: "book-outline",
    component: NotesStack,
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
    label: "Latest Quantum",
    icon: "layers-outline",
    component: QuantumStack,
  },
   {
    name: "PracticalFiles",
    label: "Practical Files",
    icon: "folder-outline",
    component: PracticalStack,
  },
  {
  name: "AktuResult",
  label: "AKTU Result",
  icon: "school-outline",
  component: AktuResultWebViewScreen,
},
 
  

 
  {
    name: "TermsConditions",
    label: "Terms & Conditions",
    icon: "document-outline",
    component: TermsConditionsScreen,
  },
  {
    name: "PrivacyPolicy",
    label: "Privacy Policy",
    icon: "shield-checkmark-outline",
    component: PrivacyPolicyScreen,
  },
   {
    name: "Disclaimer",
    label: "Disclaimer",
    icon: "alert-circle-outline",
    component: DisclaimerScreen,
  },
  
    {
    name: "ContactUs",
    label: "Contact Us",
    icon: "mail-outline",
    component: ContactUsScreen,
  },
   {
    name: "AboutUs",
    label: "About Us",
    icon: "information-circle-outline",
    component: AboutUsScreen,
  },
];
