import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import TopNavbar from '../components/TopNavbar';

import HomeScreen from '../screens/HomeScreen';
import PyqSemesterScreen from '../screens/PyqScreen/PyqSemesterScreen';
import PyqSubjectScreen from '../screens/PyqScreen/PyqSubjectScreen';
import PyqPdfListScreen from '../screens/PyqScreen/PyqPdfListScreen';
import QuantumYearLevelScreen from '../screens/Quantum/QuantumYearLevelScreen';
import QuantumPdfListScreen from '../screens/Quantum/QuantumPdfListScreen';
import TopicsYearLevelScreen from '../screens/Important Topics/TopicsYearLevelScreen';
import ImportantTopicsScreen from '../screens/Important Topics/ImportantTopicsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => (
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
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />

    <Stack.Screen name="PyqSemester" component={PyqSemesterScreen} options={{ title: 'Choose Year Level' }} />

    <Stack.Screen name="PyqSubjects" component={PyqSubjectScreen} options={{ title: 'Choose Subject' }} />

    <Stack.Screen name="PyqPdfList" component={PyqPdfListScreen} options={{ title: 'Previous Year Papers' }} />

    <Stack.Screen name="QuantumYearLevel" component={QuantumYearLevelScreen} options={{ title: 'Select Year Level' }} />

    <Stack.Screen name="QuantumPdfList" component={QuantumPdfListScreen} options={{ title: 'Quantum Papers' }} />

    <Stack.Screen name="TopicsYearLevel" component={TopicsYearLevelScreen} options={{ title: 'Important Topics' }} />

    <Stack.Screen name="ImportantTopics" component={ImportantTopicsScreen} options={{ title: 'Important Topics' }} />
  </Stack.Navigator>
);

const DrawerContent = ({ navigation }) => {
  const goto = (screenName, params) => {
    navigation.navigate('Main', { screen: screenName, params });
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerScroll}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>

      <TouchableOpacity style={styles.item} onPress={() => goto('Home')}>
        <Text style={styles.itemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => goto('PyqSemester')}>
        <Text style={styles.itemText}>Previous Year Papers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => goto('QuantumYearLevel')}>
        <Text style={styles.itemText}>Quantum Papers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => goto('TopicsYearLevel')}>
        <Text style={styles.itemText}>Important Topics</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={MainStack} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerScroll: { paddingVertical: 20 },
  drawerHeader: { paddingHorizontal: 16, paddingBottom: 12 },
  drawerTitle: { fontSize: 18, fontWeight: '700' },
  item: { paddingVertical: 14, paddingHorizontal: 16 },
  itemText: { fontSize: 16 },
});

export default AppNavigator;
