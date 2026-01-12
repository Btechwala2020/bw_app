import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from '../../components/navigation/TopNavBarBack';

export default function TermsConditionsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#07070a' }}>
      <TopNavbarBack title="Terms & Conditions" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Icon name="document-text-outline" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={styles.subtitle}>Please read carefully</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>
            BTech Wala is provided for personal and educational use only.
          </Text>
          <Text style={styles.text}>
            All study materials are shared for reference purposes and we do not
            guarantee accuracy or exam results.
          </Text>
          <Text style={styles.text}>
            Misuse, redistribution, or commercial use of app content is not
            permitted.
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
