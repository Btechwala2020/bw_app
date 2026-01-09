import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onLeftPress}>
        <Icon
          name={showBack ? "arrow-back" : "menu"}
          size={26}
          color="#fff"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 56,
    backgroundColor: "#ff4d6d",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 16,
    fontWeight: "600",
  },
});
