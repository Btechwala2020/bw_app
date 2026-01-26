import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DrawerToggle from "../DrawerToggle";

export default function TopNavbarBack({ title }) {
  const formatTitle = (str) => {
    if (!str) return "";
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const displayTitle = formatTitle(title);

  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        {/* LEFT BACK */}
        <View style={styles.side}>
          <DrawerToggle showBack />
        </View>

        {/* TITLE */}
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>

        {/* RIGHT SPACER */}
        <View style={styles.side} />
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

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
