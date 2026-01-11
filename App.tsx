

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigatorStyled from './src/navigation/DrawerNavigatorStyled';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <NavigationContainer>
      <DrawerNavigatorStyled />
    </NavigationContainer>
  );
}
