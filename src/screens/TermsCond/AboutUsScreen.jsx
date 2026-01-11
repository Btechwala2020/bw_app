import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function AboutUsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Icon name="information-circle-outline" size={28} color="#ffffff" />
        </View>

        <View>
          <Text style={styles.title}>About BTech Wala</Text>
          <Text style={styles.subtitle}>
            Learn smarter. Prepare better.
          </Text>
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>BTech Wala</Text> is built to help engineering
          students get quick and organized access to notes, previous year
          question papers (PYQs), quantum papers, and important topics.
        </Text>

        <Text style={styles.paragraph}>
          Our goal is to simplify exam preparation by keeping everything clean,
          structured, and easy to find — so you can focus on studying instead of
          searching.
        </Text>

        <Text style={styles.paragraph}>
          We respect your privacy. This app does{" "}
          <Text style={styles.bold}>not collect any personal data</Text> and is
          designed with a privacy-first approach.
        </Text>
      </View>

      {/* FOOTER CARD */}
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          If you have suggestions, feedback, or ideas for improvement, please
          reach out through the{" "}
          <Text style={styles.highlight}>Contact Us</Text> section.
        </Text>

        <Text style={styles.thankyou}>
          Thank you for using BTech Wala 🙏
        </Text>
      </View>
    </ScrollView>
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

  /* HEADER */
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

  /* CARD */
  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  paragraph: {
    color: "#e5e7eb",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },

  bold: {
    fontWeight: "700",
    color: "#ffffff",
  },

  highlight: {
    color: "#22c55e",
    fontWeight: "600",
  },

  thankyou: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
