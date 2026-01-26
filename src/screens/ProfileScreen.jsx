import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
// optional (future): image picker
// import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        const doc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (doc.exists) {
          setUserData({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            ...doc.data(),
          });
        }
      } catch (e) {
        console.log("PROFILE FETCH ERROR ❌", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await auth().signOut();
          navigation.replace("SignIn");
        },
      },
    ]);
  };

  // 📸 future-ready (picker + upload later)
  const changePhoto = () => {
    Alert.alert("Coming Soon", "Profile photo upload coming soon 🙂");
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#07070a" barStyle="light-content" />

      {/* ===== HEADER (HIGHLIGHTED) ===== */}
      <View style={styles.headerCard}>
        <TouchableOpacity style={styles.avatarWrap} onPress={changePhoto}>
          {userData?.photoURL ? (
            <Image
              source={{ uri: userData.photoURL }}
              style={styles.avatarImg}
            />
          ) : (
            <Icon name="person" size={34} color="#fff" />
          )}
          <View style={styles.cameraBadge}>
            <Icon name="camera" size={14} color="#000" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{userData?.name}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
      </View>

      {/* ===== INFO CARD ===== */}
      <View style={styles.card}>
        <ProfileRow
          icon="call-outline"
          label="Mobile Number"
          value={userData?.mobile}
        />
        <ProfileRow
          icon="school-outline"
          label="Academic Year"
          value={userData?.year}
        />
      </View>

      {/* ===== ACTIONS ===== */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon name="create-outline" size={16} color="#000" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Icon name="log-out-outline" size={18} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

/* ---------- Reusable Row ---------- */
const ProfileRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <Icon name={icon} size={18} color="#9ca3af" />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 24,
  },

  loader: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
  },

  /* HEADER (highlighted) */
  headerCard: {
    alignItems: "center",
    backgroundColor: "#0e0e11",
    borderRadius: 24,
    paddingVertical: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 30,
    backgroundColor: "#111114",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: 14,
  },

  avatarImg: {
    width: 96,
    height: 96,
    borderRadius: 30,
  },

  cameraBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#ffffff",
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  email: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },

  /* INFO */
  card: {
    backgroundColor: "#0e0e11",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    color: "#9ca3af",
    fontSize: 13,
  },

  value: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  /* ACTIONS */
  editBtn: {
    marginTop: 22,
    height: 52,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  editText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },

  logoutBtn: {
    marginTop: 14,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.4)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
});
