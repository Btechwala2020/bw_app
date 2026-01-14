import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

const BASE_URL =
  "https://pub-96d515e7e6b74514adfe46d7eb1f7fbc.r2.dev";

export default function QuantumPdfListScreen() {
  const route = useRoute();
  const { semesterKeys = [], subjectName = "Quantum" } =
    route.params || {};

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        let all = [];

        for (const sem of semesterKeys) {
          const url = `${BASE_URL}/${sem}/quantum/index.json`;
          const res = await fetch(url);

          if (res.ok) {
            const data = await res.json();
            all.push(...data.map(f => ({ ...f, sem })));
          }
        }

        setFiles(all);
      } catch (err) {
        console.log("Quantum fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [semesterKeys]);

  const openPdf = (sem, file) => {
    const url = `${BASE_URL}/${sem}/quantum/${file}`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>
          Loading quantum PDFs…
        </Text>
      </View>
    );
  }

  if (!files.length) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>
          No quantum files found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbarBack title={subjectName} />

      <FlatList
        data={files}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => openPdf(item.sem, item.file)}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="document-outline" size={22} color="#ffffff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.fileName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.meta}>
                  Tap to open PDF
                </Text>
              </View>
            </View>

            <Icon name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 16,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#9ca3af",
    marginTop: 10,
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#141417",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#1c1c21",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  fileName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    color: "#9ca3af",
    fontSize: 12,
  },
});
