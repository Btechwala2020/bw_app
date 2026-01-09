import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DrawerToggle from './DrawerToggle';
import { useNavigation } from "@react-navigation/native";

export default function TopNavbar({ title, showBack = false }) {
  const navigation = useNavigation();

  const onLeftPress = () => {
    if (showBack) {
      navigation.goBack();
    } else {
      if (navigation.toggleDrawer) {
        navigation.toggleDrawer();
      }
    }
  };

  // Format title - remove underscores and capitalize
  const formatTitle = (str) => {
    if (!str) return '';
    return str
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayTitle = formatTitle(title);

  return (
    <View style={styles.navbar}>
      <DrawerToggle showBack={showBack} style={styles.leftButton} />

      <Text style={styles.title} numberOfLines={1}>{displayTitle}</Text>

      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 56,
    backgroundColor: "#0B0B0F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  leftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  rightSpacer: {
    width: 40,
  },
});
