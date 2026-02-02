import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

const YEARS = [
  { label: "1st Year", sems: ["sem1", "sem2"], icon: "school-outline" },
  { label: "2nd Year", sems: ["sem3", "sem4"], icon: "layers-outline" },
  { label: "3rd Year", sems: ["sem5", "sem6"], icon: "book-outline" },
  { label: "4th Year", sems: ["sem7", "sem8"], icon: "ribbon-outline" },
];

export default function NotesYearSelectionScreen({ navigation }) {
  return (
    
    <View style={styles.container}>
      <TopNavbarBack title="Notes" showBack={false} />

      <Text style={styles.heading}>Select Academic Year</Text>
      <Text style={styles.subHeading}>
        Choose your year to view notes
      </Text>

      {YEARS.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.9}
          style={styles.card}
          onPress={() =>
            navigation.navigate("NotesSubject", {
              semesterKeys: item.sems,
              yearLabel: item.label,
            })
          }
        >
          <View style={styles.left}>
            <View style={styles.iconWrap}>
              <Icon
                name={item.icon}
                size={22}
                color="#ffffff"
              />
            </View>

            <View>
              <Text style={styles.title}>{item.label}</Text>
              <Text style={styles.sub}>
                {item.sems.join("  ·  ").toUpperCase()}
              </Text>
            </View>
          </View>

          <Icon
            name="chevron-forward"
            size={22}
            color="#9ca3af"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 16,
  },

  heading: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 4,
  },

  subHeading: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#1c1c21",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  sub: {
    color: "#9ca3af",
    fontSize: 12,
  },
});
