import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const BottomNav = ({ items, activeIndex, onTabPress }) => {
  return (
    <View style={styles.navContainer}>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={item.label}
          style={[styles.navItem, activeIndex === idx && styles.activeItem]}
          activeOpacity={0.85}
          onPress={() =>
            onTabPress ? onTabPress(idx) : item.onPress && item.onPress()
          }
        >
          <View style={styles.iconWrapper}>
            <Image
              source={item.icon}
              style={[
                styles.icon,
                { tintColor: activeIndex === idx ? "#fff" : "#ffffff" },
              ]}
            />
          </View>
          <Text
            style={[
              styles.label,
              activeIndex === idx && styles.activeLabel,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#313131",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
 
  iconWrapper: {
    marginBottom: 3,
  },
  icon: {
    width: 26,
    height: 26,
  },
  label: {
    fontSize: 11,
     color: "#ffffff",
    fontWeight: "500",
  },
  activeLabel: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
