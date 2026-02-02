import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

export default function PracticalFilesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { semesterKeys = [], subjectName } = route.params || {};

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        let all = [];

        for (const sem of semesterKeys) {
          const res = await fetch(
            `https://pub-20f280f9f8fb41dda24ed1b89cdb727e.r2.dev/${sem}/index.json`
          );

          if (res.ok) {
            const data = await res.json();
            all.push(...data.filter((i) => i.url));
          }
        }

        setFiles(all);
      } catch (e) {
        Alert.alert("Error", "Unable to load practical files");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [semesterKeys]);

  const openPdf = (item) => {
    navigation.navigate("PdfViewer", {
      pdfUrl: item.url,
      title: item.name,
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Loading practicals…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#07070a" }} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#07070a" translucent={false} />
    <View style={styles.container}>
      <TopNavbarBack title={subjectName || "Practicals"} />

      <FlatList
        data={files}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openPdf(item)}>
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="document-text-outline" size={22} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.fileName}>{item.name}</Text>
                <Text style={styles.meta}>Tap to open practical</Text>
              </View>
            </View>

            <Icon name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#07070a", padding: 16 },
  center: { justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#9ca3af", marginTop: 10 },
  card: {
    backgroundColor: "#141417",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    ...Platform.select({ android: { elevation: 6 } }),
  },
  left: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#1c1c21",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  fileName: { color: "#fff", fontSize: 15, fontWeight: "600", marginBottom: 6 },
  meta: { color: "#9ca3af", fontSize: 12 },
});
