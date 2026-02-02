import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

const YEAR_LEVELS = [
  { id: "1", level: "First Year", sems: ["sem1", "sem2"] },
  { id: "2", level: "Second Year", sems: ["sem3", "sem4"] },
  { id: "3", level: "Third Year", sems: ["sem5", "sem6"] },
  { id: "4", level: "Fourth Year", sems: ["sem7", "sem8"] },
];

export default function PyqSemesterScreen() {
  const navigation = useNavigation();

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: "#07070a" }} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#07070a" translucent={false} />
    <View style={styles.root}>
      <TopNavbarBack title="Previous Year Questions" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Choose Your Academic Year</Text>
        <Text style={styles.subHeading}>
          Access semester-wise previous year questions
        </Text>

        {YEAR_LEVELS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              navigation.navigate("PyqSubjects", {
                semesters: item.sems,
                yearLabel: item.level,
              })
            }
          >
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="school-outline" size={22} color="#ffffff" />
              </View>

              <View>
                <Text style={styles.title}>{item.level}</Text>
                <Text style={styles.subtitle}>
                  Semester {item.sems[0].replace("sem", "")} &{" "}
                  {item.sems[1].replace("sem", "")}
                </Text>
              </View>
            </View>

            {/* RIGHT */}
            <Icon name="chevron-forward" size={22} color="#d1d5db" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07070a",
  },

  container: {
    padding: 18,
  },

  heading: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },

  subHeading: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#141417",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // subtle premium border
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

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

  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
  },
});
