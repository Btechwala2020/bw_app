import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

export default function NotesSubjectScreen({ route, navigation }) {
  const { semesterKeys = [], yearLabel } = route.params;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      let result = [];

      for (const sem of semesterKeys) {
        const url =
          `https://pub-ed489d6d9d3742bbae9f8e9c36388245.r2.dev/${sem}/index.json`;

        try {
          const res = await fetch(url);
          const json = await res.json();

          if (Array.isArray(json)) {
            json.forEach((item, idx) => {
              result.push({
                name: item.name,
                key: `${item.key}-${idx}`,
                sem,
              });
            });
          }
        } catch (e) {
          console.log("FAILED SEM", sem);
        }
      }

      setSubjects(result);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loading}>Loading subjects…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#07070a" }} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#07070a" translucent={false} />
    <View style={styles.container}>
      <TopNavbarBack title={yearLabel} />

      <Text style={styles.heading}>Choose Subject</Text>
      <Text style={styles.subHeading}>
        Select a subject to continue
      </Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              navigation.navigate("NotesType", {
                semKey: item.sem,
                subjectKey: item.key.split("-")[0],
                subjectName: item.name,
              })
            }
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="book-outline" size={22} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.meta}>
                  Handwritten · Digital · Short
                </Text>
              </View>
            </View>

            <View style={styles.right}>
              
              <Icon name="chevron-forward" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        )}
      />
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

  center: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    color: "#9ca3af",
    marginTop: 10,
    fontSize: 13,
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
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
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

  meta: {
    color: "#9ca3af",
    fontSize: 12,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  semBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },

  semText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
