import React, { useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function DrawerToggle({ showBack = false, style }) {
  const navigation = useNavigation();
  const [pressed, setPressed] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const onPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      if (showBack) {
        navigation.goBack();
      } else if (navigation && typeof navigation.toggleDrawer === 'function') {
        navigation.toggleDrawer();
      }
    } catch (e) {
      console.log('DrawerToggle: navigation not available', e);
    }
  };

  const onPressIn = () => setPressed(true);
  const onPressOut = () => setPressed(false);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          {
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: pressed ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          style,
        ]}
      >
        <Icon
          name={showBack ? 'arrow-back' : 'menu'}
          size={26}
          color="#ffffff"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}
