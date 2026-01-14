import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

const BottomNav = ({ items, activeIndex, onTabPress }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.navContainer}>
        {items.map((item, index) => {
          const active = activeIndex === index;

          return (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.9}
              style={styles.navItem}
              onPress={() =>
                onTabPress ? onTabPress(index) : item.onPress?.()
              }
            >
              <View
                style={[
                  styles.iconBox,
                  active && styles.activeIconBox,
                ]}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={[
                    styles.icon,
                    active && styles.activeIcon,
                  ]}
                />
              </View>

              <Text
                style={[
                  styles.label,
                  active && styles.activeLabel,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 18,
    left: 16,
    right: 16,
  },

  navContainer: {
    flexDirection: "row",
    backgroundColor: "#0f0f13",
    borderRadius: 26,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    justifyContent: "space-between",

    ...Platform.select({
      android: { elevation: 12 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 10 },
      },
    }),
  },

  navItem: {
    flex: 1,
    alignItems: "center",
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 6,
  },

  activeIconBox: {
    backgroundColor: "#ffffff",
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: "#ffffff",
  },

  activeIcon: {
    tintColor: "#000000",
  },

  label: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "500",
  },

  activeLabel: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
