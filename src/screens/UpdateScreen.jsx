import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";

const UpdateScreen = ({ route }) => {
  const { updateData } = route.params;

  const openBrowser = async () => {
    try {
      await Linking.openURL(updateData.updateUrl);
    } catch (e) {
      console.log("BROWSER OPEN ERROR ❌", e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#07070a" barStyle="light-content" />

      {/* LOTTIE */}
      <View style={styles.lottieWrap}>
        
      </View>

      {/* TEXT */}
      <Text style={styles.title}>Update Available</Text>
      <Text style={styles.desc}>
        A new version ({updateData.latestVersion}) is available.
        Please update to continue using the app.
      </Text>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={openBrowser}>
        <Text style={styles.buttonText}>Download Update</Text>
      </TouchableOpacity>

      {/* NOTE */}
      <Text style={styles.note}>
        After download, tap the APK from notification bar to install.
      </Text>
    </View>
  );
};

export default UpdateScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  lottieWrap: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },

  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 10,
  },

  desc: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 28,
    lineHeight: 20,
  },

  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "600",
  },

  note: {
    marginTop: 16,
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});
