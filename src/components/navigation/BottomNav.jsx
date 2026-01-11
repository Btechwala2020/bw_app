import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NavItem = ({ label }) => (
  <View style={styles.navItem}>
    <Text style={styles.navText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  navItem: {
    padding: 8,
  },
  navText: {
    color: '#fff',
  },
});

export default NavItem;