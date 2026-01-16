import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopNavbarBack from '../../components/navigation/TopNavBarBack.jsx';

const YEAR_LEVELS = [
  { id: "1", level: "1st Year", subtitle: "Semesters 1 & 2" },
  { id: "2", level: "2nd Year", subtitle: "Semesters 3 & 4" },
  { id: "3", level: "3rd Year", subtitle: "Semesters 5 & 6" },
  { id: "4", level: "4th Year", subtitle: "Semesters 7 & 8" },
];

export default function PracticalYearSelectionScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
       <TopNavbarBack title="Practical Files" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Select Academic Year</Text>
        <Text style={styles.subHeading}>Find Practical Files by your Academic Year</Text>
        {YEAR_LEVELS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation.navigate("PracticalFiles", { yearLevel: item.level })}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Text style={styles.iconText}>{item.id}</Text>
              </View>
              <View>
                <Text style={styles.title}>{item.level}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#07070a" },
  container: { paddingVertical: 24 },
  heading: { color: "#fff", fontSize: 24, fontWeight: "800", marginHorizontal: 20, marginBottom: 6 },
  subHeading: { color: "#9ca3af", fontSize: 13, marginHorizontal: 20, marginBottom: 20 },
  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    elevation: 10,
  },
  left: { flexDirection: "row", alignItems: "center" },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  subtitle: { color: "#9ca3af", fontSize: 13, marginTop: 4 },
  chev: { color: "#fff", fontSize: 26, fontWeight: "800" },
});
