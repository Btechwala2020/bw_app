import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NOTE_TYPES = [
  { key: "handwritten", label: "Handwritten Notes" },
  { key: "digital", label: "Digital Notes" },
  { key: "multiatoms", label: "Multiatoms Notes" },
  { key: "short", label: "Short Notes" },
];

export default function NotesScreen({ route, navigation }) {
  // Optionally get yearLevel from route.params
  const { yearLevel } = route?.params || {};

  const handleCardPress = (type) => {
    navigation.navigate('NotesSubjectSelect', { yearLevel });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Select Notes Type</Text>
      <View style={styles.grid}>
        {NOTE_TYPES.map((item, idx) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => handleCardPress(item.key)}
          >
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#07070a", padding: 20 },
  heading: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 24, textAlign: "center" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  card: {
    backgroundColor: "#141417",
    borderRadius: 18,
    width: '30%',
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    elevation: 6,
  },
  cardText: { color: "#fff", fontWeight: "700", fontSize: 15, textAlign: "center" },
});
