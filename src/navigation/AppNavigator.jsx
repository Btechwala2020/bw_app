import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TopNavbar from '../components/TopNavbar';

import HomeScreen from '../screens/HomeScreen';
import PyqSemesterScreen from '../screens/PyqSemesterScreen';
import PyqSubjectScreen from '../screens/PyqSubjectScreen';
import PyqPdfListScreen from '../screens/PyqPdfListScreen';
import QuantumYearLevelScreen from '../screens/Quantum/QuantumYearLevelScreen';
import QuantumPdfListScreen from '../screens/Quantum/QuantumPdfListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        header: () => (
          <TopNavbar
            title={route?.params?.title || route.name}
            navigation={navigation}
            showBack={route.name !== 'Home'}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />

      <Stack.Screen
        name="PyqSemester"
        component={PyqSemesterScreen}
        options={{ title: 'Choose Semester' }}
      />

      <Stack.Screen
        name="PyqSubjects"
        component={PyqSubjectScreen}
        options={{ title: 'Choose Subject' }}
      />

      <Stack.Screen
        name="PyqPdfList"
        component={PyqPdfListScreen}
        options={{ title: 'Previous Year Papers' }}
      />

      <Stack.Screen
        name="QuantumYearLevel"
        component={QuantumYearLevelScreen}
        options={{ title: 'Select Year Level' }}
      />

      <Stack.Screen
        name="QuantumPdfList"
        component={QuantumPdfListScreen}
        options={{ title: 'Quantum Papers' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
