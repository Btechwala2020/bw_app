import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/Ionicons";

const SignInScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1082333864522-uohlr7c4b83i5g4o80pa4aq3e96767ev.apps.googleusercontent.com",
    });
  }, []);

 const signInWithGoogle = async () => {
  try {
    setLoading(true);

    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();

    const { idToken } = await GoogleSignin.getTokens();
    if (!idToken) throw new Error("Google ID token not found");

    const credential =
      auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(credential);

    // ✅ ALWAYS GO TO PROFILE SCREEN AFTER LOGIN
    navigation.replace("ProfileSetup");

  } catch (error) {
    console.log("LOGIN ERROR ❌", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#07070a" barStyle="light-content" />

      {/* Logo / Title */}
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Icon name="school-outline" size={34} color="#fff" />
        </View>
        <Text style={styles.title}>BTechWala</Text>
        <Text style={styles.subtitle}>
          Notes • PYQs • Quantum
        </Text>
      </View>

      {/* Google Button */}
      <TouchableOpacity
        style={styles.googleBtn}
        activeOpacity={0.85}
        onPress={signInWithGoogle}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <>
            <Icon name="logo-google" size={20} color="#000" />
            <Text style={styles.googleText}>
              Continue with Google
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        By continuing, you agree to our Terms & Privacy Policy
      </Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 60,
  },

  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#111114",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: 16,
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 6,
  },

  googleBtn: {
    width: "100%",
    height: 54,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 3,
  },

  googleText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    position: "absolute",
    bottom: 36,
    color: "#6b7280",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
