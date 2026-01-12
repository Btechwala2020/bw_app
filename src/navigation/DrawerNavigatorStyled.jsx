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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";

import { DRAWER_ROUTES } from "./drawerRoutes";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


/* ================= DRAWER CONTENT ================= */
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.logoWrap}>
          <Icon name="school-outline" size={22} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.appName}>BTech Wala</Text>
          <Text style={styles.tagline}>Notes • PYQs • Quantum</Text>
        </View>
      </View>

      {DRAWER_ROUTES.filter(item => !item.hidden).map((item) => (
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

          <Text style={styles.drawerChevron}>›</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>Crafted with focus ✦</Text>
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
      }}
    >
      {DRAWER_ROUTES.filter(route => !route.hidden).map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{ title: route.label }}
        />
      ))}
    </Drawer.Navigator>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  headerBtn: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  drawerContent: {
    backgroundColor: "#07070a",
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  logoWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  appName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },

  tagline: {
    color: "#9ca3af",
    fontSize: 12,
  },

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
    borderWidth: 2,
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

  drawerChevron: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },

  drawerFooter: {
    marginTop: 16,
    alignItems: "center",
  },

  footerText: {
    color: "#6b7280",
    fontSize: 12,
  },
});
