import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function PyqSemesterPicker({
  visible,
  semesters,
  onClose,
  onSelect,
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Drag Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>Choose Semester</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          {/* Semester Cards */}
          {semesters.map((sem) => (
            <TouchableOpacity
              key={sem}
              activeOpacity={0.85}
              style={styles.semCard}
              onPress={() => onSelect(sem)}
            >
              <Text style={styles.semText}>
                Semester {sem.replace("sem", "")}
              </Text>
              <Icon name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#0f0f12",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    // premium border
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  handle: {
    width: 46,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#2a2a2e",
    alignSelf: "center",
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  heading: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  semCard: {
    backgroundColor: "#151518",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // subtle depth
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  semText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
