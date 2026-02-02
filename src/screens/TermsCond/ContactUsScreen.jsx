import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from '../../components/navigation/TopNavBarBack';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
export default function ContactUsScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#07070a" }}
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#07070a"
        translucent={false}
      />
      <View style={{ flex: 1, backgroundColor: '#07070a' }}>
        <TopNavbarBack title="Contact Us" />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconWrap}>
              <Icon name="mail-outline" size={28} color="#fff" />
            </View>
            <View>
              <Text style={styles.title}>Contact Us</Text>
              <Text style={styles.subtitle}>We are here to help</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}>
              For feedback, suggestions, or content related queries, feel free to
              contact us.
            </Text>
            <Text style={styles.text}>
              📧 Email: support@btechwala.app
            </Text>
            <Text style={styles.text}>
              We usually respond within 24–48 hours.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    elevation: 10,
  },
  text: {
    color: "#e5e7eb",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
});
