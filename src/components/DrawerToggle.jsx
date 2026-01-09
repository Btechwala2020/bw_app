import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function DrawerToggle({ showBack = false, style }) {
  const navigation = useNavigation();

  const onPress = () => {
    try {
      if (showBack) {
        navigation.goBack();
      } else if (navigation && typeof navigation.toggleDrawer === 'function') {
        navigation.toggleDrawer();
      }
    } catch (e) {
      // silently ignore if navigation not available
      console.log('DrawerToggle: navigation not available', e);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon name={showBack ? 'arrow-back' : 'menu'} size={24} color="#22c55e" />
    </TouchableOpacity>
  );
}
