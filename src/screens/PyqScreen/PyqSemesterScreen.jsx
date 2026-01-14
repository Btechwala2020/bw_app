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
import TopNavbarBack from '../../components/navigation/TopNavBarBack';
const YEAR_LEVELS = [
  {
    id: "1",
    level: "1st Year",
    subtitle: "Semesters 1 & 2",
    sems: ["sem1", "sem2"],
  },
  {
    id: "2",
    level: "2nd Year",
    subtitle: "Semesters 3 & 4",
    sems: ["sem3", "sem4"],
  },
  {
    id: "3",
    level: "3rd Year",
    subtitle: "Semesters 5 & 6",
    sems: ["sem5", "sem6"],
  },
  {
    id: "4",
    level: "4th Year",
    subtitle: "Semesters 7 & 8",
    sems: ["sem7", "sem8"],
  },
];

export default function PyqSemesterScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
       <TopNavbarBack title="PYQ" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.heading}>Select Academic Year</Text>
        <Text style={styles.subHeading}>
          Find Previous Year Question Papers
        </Text>

        {/* CARDS */}
        {YEAR_LEVELS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              navigation.navigate("PyqSubjects", {
                yearLevel: item.level,
                semesters: item.sems,
              })
            }
          >
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="school-outline" size={24} color="#ffffff" />
              </View>

              <View>
                <Text style={styles.title}>{item.level}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>

            {/* RIGHT */}
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07070a",
  },

  container: {
    paddingVertical: 24,
  },

  heading: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginHorizontal: 20,
    marginBottom: 6,
  },

  subHeading: {
    color: "#9ca3af",
    fontSize: 13,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  /* CARD */
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

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

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

  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },

  chev: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
  },
});
