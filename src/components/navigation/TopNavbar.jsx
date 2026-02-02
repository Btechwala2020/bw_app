import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Share,
  Platform,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";

import DrawerToggle from "../DrawerToggle";
import { checkAppUpdate } from "../../utils/checkAppUpdate";

export default function TopNavbar({ title, showBack = false }) {
  const navigation = useNavigation();
  const user = auth().currentUser;

  const [menuVisible, setMenuVisible] = useState(false);
  const [checking, setChecking] = useState(false);

  /* ================= SHARE (ULTRA SAFE) ================= */
  const onShare = async () => {
    const message =
      "📚 BTechWala App\n" +
      "Notes • PYQs • Quantum\n\n" +
      "Download here 👇\n" +
      "https://www.btechwala.in/app-download";

    try {
      // PRIMARY (RN built-in)
      await Share.share(
        {
          message,
          title: "BTechWala App",
        },
        {
          dialogTitle: "Share BTechWala App",
        }
      );
    } catch (err) {
      // FALLBACK (never crashes)
      const url =
        Platform.OS === "android"
          ? `whatsapp://send?text=${encodeURIComponent(message)}`
          : `https://wa.me/?text=${encodeURIComponent(message)}`;

      Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Unable to share right now");
      });
    }
  };

  /* ================= TITLE FORMAT ================= */
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

  /* ================= MENU ================= */
  const openProfile = () => {
    setMenuVisible(false);
    navigation.navigate("Profile");
  };

  const manualUpdateCheck = async () => {
    if (checking) return;

    setChecking(true);
    setMenuVisible(false);

    try {
      const hasUpdate = await checkAppUpdate(navigation);
      if (!hasUpdate) {
        Alert.alert(
          "You're up to date 🎉",
          "You are already using the latest version of BTechWala."
        );
      }
    } catch {
      Alert.alert("Error", "Unable to check update");
    }

    setChecking(false);
  };

  /* ================= UI ================= */
  return (
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <DrawerToggle showBack={showBack} style={styles.leftButton} />

        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>

        {/* SHARE */}
        <TouchableOpacity onPress={onShare} style={{ padding: 8 }}>
          <Icon
            name="share-social-outline"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => setMenuVisible(true)}
        >
          <Icon
            name={user?.photoURL ? "person-circle" : "person-outline"}
            size={user?.photoURL ? 34 : 26}
            color="#E5E7EB"
          />
        </TouchableOpacity>
      </View>

      {/* MENU */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={openProfile}
            >
              <Icon name="person-outline" size={18} color="#fff" />
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={manualUpdateCheck}
              disabled={checking}
            >
              <Icon name="refresh-outline" size={18} color="#fff" />
              <Text style={styles.menuText}>
                {checking ? "Checking..." : "Check Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

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
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#E5E7EB",
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  profileBtn: {
    width: 42,
    alignItems: "flex-end",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menu: {
    marginTop: 60,
    marginRight: 14,
    backgroundColor: "#111114",
    borderRadius: 14,
    paddingVertical: 8,
    width: 170,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  menuText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 14,
  },
});