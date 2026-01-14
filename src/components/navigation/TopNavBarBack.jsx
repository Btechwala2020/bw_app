import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DrawerToggle from "../DrawerToggle";

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
    <View style={styles.wrappere}>
      <View style={styles.navbare}>
        {/* LEFT (Drawer/Menu) */}
        <DrawerToggle showBack={true} style={styles.leftButtone} />

        {/* CENTER TITLE */}
        <Text style={styles.titlee} numberOfLines={1}>
          {displayTitle}
        </Text>

        {/* RIGHT (Back Button) */}
         <View style={styles.rightSpacer} />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrappere: {
    backgroundColor: "#0B0B0F",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  navbare: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    
  },

  leftButtone: {
    width: 62,
    height: 62,
    borderRadius: 102,
    justifyContent: "center",
    alignItems: "center",
  },

  titlee: {
    flex: 1,
    // textAlign: "center",
    color: "#E5E7EB",
    fontSize: 25,
    fontWeight: "600",
    // marginHorizontal: 68,
    letterSpacing: 0.4,
    textAlign:"center",
   
  },
  rightSpacer: {
    width: 72,
  },
  rightButtone: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
