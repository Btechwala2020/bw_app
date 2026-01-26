import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const ProfileSetupScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [year, setYear] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveProfile = async () => {
    if (mobile.length !== 10) {
      Alert.alert("Invalid", "Enter valid 10 digit mobile number");
      return;
    }
    if (!year) {
      Alert.alert("Missing", "Please select your year");
      return;
    }

    try {
      setLoading(true);
      const user = auth().currentUser;

      await firestore()
        .collection("users")
        .doc(user.uid)
        .set(
          {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            mobile,
            year,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      // ✅ CORRECT NAVIGATION
      navigation.replace("App");
    } catch (e) {
      console.log("PROFILE ERROR ❌", e);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#07070a" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Icon name="person-outline" size={26} color="#fff" />
        </View>
        <Text style={styles.title}>Complete Profile</Text>
        <Text style={styles.subtitle}>
          Just one step to continue
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Mobile */}
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputWrap}>
          <Icon name="call-outline" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Enter mobile number"
            placeholderTextColor="#6b7280"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
        </View>

        {/* Year Dropdown */}
        <Text style={styles.label}>Academic Year</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(true)}
        >
          <Text style={year ? styles.dropdownText : styles.placeholder}>
            {year || "Select your year"}
          </Text>
          <Icon name="chevron-down" size={18} color="#9ca3af" />
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={saveProfile}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.sheet}>
            {YEARS.map((y) => (
              <TouchableOpacity
                key={y}
                style={styles.sheetItem}
                onPress={() => {
                  setYear(y);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.sheetText}>{y}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ProfileSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#111114",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#0e0e11",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  label: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 14,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#07070a",
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  input: {
    flex: 1,
    height: 48,
    color: "#fff",
    marginLeft: 8,
  },

  dropdown: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#07070a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    color: "#6b7280",
    fontSize: 14,
  },

  dropdownText: {
    color: "#fff",
    fontSize: 14,
  },

  button: {
    marginTop: 24,
    height: 52,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#0e0e11",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
  },

  sheetItem: {
    paddingVertical: 14,
  },

  sheetText: {
    color: "#fff",
    fontSize: 15,
  },
});
