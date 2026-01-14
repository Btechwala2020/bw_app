import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import { DRAWER_ROUTES } from "./drawerRoutes";

const Drawer = createDrawerNavigator();

/* ================= CUSTOM DRAWER ================= */
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.drawerContent}
    >
      {/* ===== HEADER (FIXED UI) ===== */}
      <View style={styles.headerCard}>
        <View style={styles.headerLeft}>
          <View style={styles.logoWrap}>
            <Icon name="school-outline" size={22} color="#fff" />
          </View>

          <View>
            <Text style={styles.appName}>BTech Wala</Text>
            <Text style={styles.tagline}>
              Notes • PYQs • Quantum
            </Text>
          </View>
        </View>
      </View>

      {/* ===== MENU ===== */}
      {DRAWER_ROUTES.filter(i => !i.hidden).map(item => (
        <TouchableOpacity
          key={item.name}
          activeOpacity={0.85}
          style={styles.drawerCard}
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate(item.name);
          }}
        >
          <View style={styles.drawerLeft}>
            <View style={styles.drawerIconWrap}>
              <Icon name={item.icon} size={20} color="#ffffff" />
            </View>
            <Text style={styles.drawerLabel}>{item.label}</Text>
          </View>

          <Icon name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      ))}

      {/* ===== FOOTER ===== */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>
          Crafted with focus ✦
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

/* ================= DRAWER NAVIGATOR ================= */
export default function DrawerNavigatorStyled() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#07070a",
          width: "78%",
        },
      }}
    >
      {DRAWER_ROUTES.filter(r => !r.hidden).map(route => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Drawer.Navigator>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#07070a",
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },

  /* HEADER */
  headerCard: {
    backgroundColor: "#111114",
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#1a1a1f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  appName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },

  tagline: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
  },

  /* MENU */
  drawerCard: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  drawerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  drawerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  drawerLabel: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  /* FOOTER */
  drawerFooter: {
    marginTop: 18,
    alignItems: "center",
  },

  footerText: {
    color: "#6b7280",
    fontSize: 12,
  },
});
