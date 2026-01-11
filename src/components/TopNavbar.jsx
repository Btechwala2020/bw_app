import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DrawerToggle from "./DrawerToggle";

export default function TopNavbar({ title, showBack = false }) {
  // Format title: camelCase / snake_case → Proper Title
  const formatTitle = (str) => {
    if (!str) return "";
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim()
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const displayTitle = formatTitle(title);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        {/* LEFT (Drawer / Back) */}
        <DrawerToggle showBack={showBack} style={styles.leftButton} />

        {/* CENTER TITLE */}
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>

        {/* RIGHT SPACER (for perfect center alignment) */}
        <View style={styles.rightSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0B0B0F",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  navbar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  leftButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: "#E5E7EB",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.4,
    marginHorizontal: 12,
  },

  rightSpacer: {
    width: 42,
  },
});
