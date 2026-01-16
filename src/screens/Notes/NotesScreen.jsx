import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from '../../components/navigation/TopNavBarBack';

const NOTE_TYPES = [
  {
    key: "handwritten",
    label: "Handwritten Notes",
    desc: "Scanned & handwritten PDFs",
    icon: "pencil-outline",
    accent: "#22c55e",
  },
  {
    key: "digital",
    label: "Digital Notes",
    desc: "Typed & formatted notes",
    icon: "laptop-outline",
    accent: "#3b82f6",
  },
  {
    key: "multiatoms",
    label: "Multiatoms Notes",
    desc: "Topic-wise short concepts",
    icon: "layers-outline",
    accent: "#a855f7",
  },
  {
    key: "short",
    label: "Short Notes",
    desc: "Revision focused notes",
    icon: "flash-outline",
    accent: "#f59e0b",
  },
];

export default function NotesScreen({ route, navigation }) {
  const { yearLevel } = route?.params || {};

  const handlePress = (noteType) => {
    navigation.navigate("NotesSubjectSelect", {
      yearLevel,
      noteType,
    });
  };

  return (
    <View style={styles.root}>
      <TopNavbarBack title={ "Select Notes Type"} />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose Notes Type</Text>
        <Text style={styles.subtitle}>
          {yearLevel} · Select how you want to study
        </Text>
      </View>

      {/* LIST */}
      {NOTE_TYPES.map(item => (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.88}
          style={styles.card}
          onPress={() => handlePress(item.key)}
        >
          {/* Accent bar */}
          <View
            style={[
              styles.accent,
              { backgroundColor: item.accent },
            ]}
          />

          {/* Icon */}
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: `${item.accent}22` },
            ]}
          >
            <Icon
              name={item.icon}
              size={22}
              color={item.accent}
            />
          </View>

          {/* Text */}
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {item.label}
            </Text>
            <Text style={styles.cardDesc}>
              {item.desc}
            </Text>
          </View>

          {/* Arrow */}
          <Icon
            name="chevron-forward"
            size={20}
            color="#6b7280"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#121216",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },

  accent: {
    width: 4,
    height: "100%",
    borderRadius: 4,
    marginRight: 14,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardDesc: {
    color: "#9ca3af",
    fontSize: 12,
  },
});
