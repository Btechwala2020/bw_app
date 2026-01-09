import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../theme/colors';

const NavItem = ({ label, icon, active, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={[
          styles.icon,
          { tintColor: active ? COLORS.accent : COLORS.subText },
        ]}
      />
      <Text style={[styles.text, active && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default NavItem;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  icon: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },
  text: {
    fontSize: 11,
    color: COLORS.subText,
  },
  activeText: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});
