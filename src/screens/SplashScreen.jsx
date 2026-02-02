import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { checkAppUpdate } from "../utils/checkAppUpdate";

const SplashScreen = ({ navigation }) => {

  /* ================= USER + PROFILE CHECK ================= */
  const checkUserAndNavigate = async () => {
    try {
      const user = auth().currentUser;

      if (!user) {
        navigation.replace("SignIn");
        return;
      }

      const doc = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (!doc.exists || !doc.data()?.mobile || !doc.data()?.year) {
        navigation.replace("ProfileSetup");
      } else {
        navigation.replace("App");
      }
    } catch (e) {
      console.log("SPLASH ERROR ❌", e);
      navigation.replace("SignIn");
    }
  };

  /* ================= SPLASH FLOW ================= */
  useEffect(() => {
    const init = async () => {
      // ⏳ splash animation delay
      await new Promise((res) => setTimeout(res, 2000));

      // 🔥 update check
      const updating = await checkAppUpdate(navigation);
      if (updating) return;

      // 👉 normal auth flow
      await checkUserAndNavigate();
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#07070a" barStyle="light-content" />

      <View style={styles.card}>
        <View style={styles.lottieWrap}>
          <LottieView
            source={require("../assets/lottie/splash.json")}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </View>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.logo}>BTechWala</Text>
        <Text style={styles.tagline}>Notes • PYQs • Quantum</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>by PL Creations</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

/* ================= STYLES ================= */
// ⚠️ styles bilkul same rakhe hain (no change)

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: 220,
    height: 220,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.45,
        shadowRadius: 28,
      },
      android: {
        elevation: 12,
      },
    }),
  },

  lottieWrap: {
    width: 160,
    height: 160,
  },

  lottie: {
    width: "100%",
    height: "100%",
  },

  textWrap: {
    marginTop: 28,
    alignItems: "center",
  },

  logo: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  tagline: {
    marginTop: 8,
    color: "#9ca3af",
    fontSize: 13,
    letterSpacing: 0.4,
  },

  footer: {
    position: "absolute",
    bottom: 28,
  },

  footerText: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 0.3,
  },
});
