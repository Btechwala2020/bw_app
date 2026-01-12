import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../../components/navigation/BottomNav";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";
import DrawerToggle from "../../components/DrawerToggle";

const YEAR_LEVELS = [
  { id: "1", level: "1st Year", subtitle: "Semesters 1 & 2" },
  { id: "2", level: "2nd Year", subtitle: "Semesters 3 & 4" },
  { id: "3", level: "3rd Year", subtitle: "Semesters 5 & 6" },
  { id: "4", level: "4th Year", subtitle: "Semesters 7 & 8" },
];

export default function QuantumYearLevelScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <TopNavbarBack title="Important Topics" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.title}>Select Year Level</Text>
          <Text style={styles.subtitle}>Explore Quantum Papers by Year</Text>
        </View>

        {YEAR_LEVELS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation.navigate("QuantumPdfList", { yearLevel: item.level })}
          >
            <View style={styles.cardInner}>
              <View style={styles.iconWrap}>
                <Text style={styles.iconText}>{item.id}</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>{item.level}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav
        items={[
          {
            label: "Home",
            icon: require("../../assets/icons/home.png"),
            onPress: () => navigation.navigate("Home"),
          },
          {
            label: "Quantum",
            icon: require("../../assets/icons/quantum.png"),
            onPress: () => navigation.navigate("QuantumYearLevel"),
          },
        ]}
        activeIndex={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#07070a" },
//   container: { padding: 16, paddingTop: 80 },
  header: { marginBottom: 24 },
  title: { color: "#fff", fontSize: 24, fontWeight: "800", marginBottom: 4 },
  subtitle: { color: "#9ca3af", fontSize: 13 },
  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    // backgroundColor: "#1e1e22",
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  cardSubtitle: { color: "#9ca3af", fontSize: 13 },
  chev: { color: "#fff", fontSize: 26, fontWeight: "800" },
});
