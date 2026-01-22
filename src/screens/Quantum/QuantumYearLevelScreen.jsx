import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

const YEAR_LEVELS = [
  { id: "1", level: "1st Year", sems: "Sem 1 · Sem 2" },
  { id: "2", level: "2nd Year", sems: "Sem 3 · Sem 4" },
  { id: "3", level: "3rd Year", sems: "Sem 5 · Sem 6" },
  { id: "4", level: "4th Year", sems: "Sem 7 · Sem 8" },
];

export default function QuantumYearLevelScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <TopNavbarBack title="Quantum" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose Academic Year</Text>
        <Text style={styles.subtitle}>
          Quantum papers year-wise
        </Text>

        {YEAR_LEVELS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => {
              let semesterKeys = [];

              if (item.level === "1st Year") semesterKeys = ["sem1", "sem2"];
              else if (item.level === "2nd Year")
                semesterKeys = ["sem3", "sem4"];
              else if (item.level === "3rd Year")
                semesterKeys = ["sem5", "sem6"];
              else if (item.level === "4th Year")
                semesterKeys = ["sem7", "sem8"];

              navigation.navigate("QuantumTopics", {
                semesterKeys,
                subjectName: item.level,
              });
            }}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="layers-outline" size={22} color="#fff" />
              </View>
              <View>
                <Text style={styles.cardTitle}>{item.level}</Text>
                <Text style={styles.cardSub}>{item.sems}</Text>
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
  container: { padding: 16, paddingTop: 24 },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    padding: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    ...Platform.select({ android: { elevation: 10 } }),
  },
  left: { flexDirection: "row", alignItems: "center" },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  cardSub: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },
  chev: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },
});
