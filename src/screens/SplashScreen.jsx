import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, 3800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#07070a"
        barStyle="light-content"
      />

      {/* Logo Animation */}
      <View style={styles.animationWrap}>
        <LottieView
          source={require("../assets/lottie/splash.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
      </View>

      {/* App Branding */}
      <View style={styles.textWrap}>
        <Text style={styles.appName}>BTechWala</Text>
        <Text style={styles.tagline}>
          Notes • PYQs • Quantum
        </Text>
      </View>

      {/* Company Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          by PL Creations
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
  },

  animationWrap: {
    width: 180,
    height: 180,
    borderRadius: 40,
    backgroundColor: "#111114",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 22,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  lottie: {
    width: 140,
    height: 140,
  },

  textWrap: {
    marginTop: 26,
    alignItems: "center",
  },

  appName: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  tagline: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 6,
  },

  footer: {
    position: "absolute",
    bottom: 32,
  },

  footerText: {
    color: "#6b7280",
    fontSize: 12,
    letterSpacing: 0.4,
  },
});
