import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from '../../components/navigation/TopNavBarBack';

export default function PrivacyPolicyScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#07070a' }}>
      <TopNavbarBack title="Privacy Policy" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Icon name="shield-checkmark-outline" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.subtitle}>Your privacy matters to us</Text>
          </View>
        </View>
        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.text}>
            BTech Wala respects your privacy. This application does not collect,
            store, or share any personal information from users.
          </Text>
          <Text style={styles.text}>
            We do not use advertisements, analytics tools, cookies, or tracking
            technologies of any kind.
          </Text>
          <Text style={styles.text}>
            Any information shared through the Contact Us section is used only to
            respond to user queries.
          </Text>
        </View>
      </ScrollView>
    </View>
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
