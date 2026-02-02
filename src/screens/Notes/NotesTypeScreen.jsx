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

const TYPES = [
  {
    key: "handwritten",
    title: "Handwritten Notes",
    subtitle: "Scanned classroom notes",
    icon: "create-outline",
  },
  {
    key: "digital",
    title: "Digital Notes",
    subtitle: "Typed & formatted PDFs",
    icon: "document-text-outline",
  },
  {
    key: "short",
    title: "Short Notes",
    subtitle: "Quick revision points",
    icon: "flash-outline",
  },
];

export default function NotesTypeScreen({ route, navigation }) {
  const { semKey, subjectKey, subjectName } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#07070a" }} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#07070a" translucent={false} />
    <View style={styles.container}>
      <TopNavbarBack title={subjectName} />

      <Text style={styles.heading}>Select Notes Type</Text>
      <Text style={styles.subHeading}>
        Choose how you want to study
      </Text>

      {TYPES.map((item) => (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.9}
          style={styles.card}
          onPress={() =>
            navigation.navigate("NotesPdfList", {
              semKey,
              subjectKey,
              noteType: item.key,
            })
          }
        >
          <View style={styles.left}>
            <View style={styles.iconWrap}>
              <Icon name={item.icon} size={24} color="#ffffff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
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
    </SafeAreaView>
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
    marginTop: 6,
    marginBottom: 4,
  },

  subHeading: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 22,
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
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#1c1c21",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 12,
  },
});
