import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import DrawerToggle from "../DrawerToggle";

export default function TopNavbar({ title }) {
  // Format title: camelCase / snake_case → Proper Title
  const formatTitle = (str) => {
    if (!str) return "";
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const displayTitle = formatTitle(title);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        {/* LEFT (Back / Drawer) */}
        <View style={styles.side}>
          <DrawerToggle showBack />
        </View>

        {/* CENTER TITLE */}
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>

        {/* RIGHT SPACER (balance center title) */}
        <View style={styles.side} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0B0B10",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },

  navbar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  side: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: "#F9FAFB",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
