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
import RNFS from "react-native-fs";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

const BASE_URL =
  "https://pub-96d515e7e6b74514adfe46d7eb1f7fbc.r2.dev";

export default function QuantumPdfListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { semesterKeys = [], subjectName = "Quantum" } =
    route.params || {};

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState({});

  /* ================= FETCH FILES ================= */
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        let all = [];

        for (const sem of semesterKeys) {
          const res = await fetch(
            `${BASE_URL}/${sem}/quantum/index.json`
          );

          if (res.ok) {
            const data = await res.json();

            all.push(
              ...data.filter(i => i.url).map(i => ({
                ...i,
                sem,
              }))
            );
          }
        }

        setFiles(all);
      } catch (e) {
        console.log("Quantum fetch error", e);
        Alert.alert("Error", "Unable to load quantum PDFs");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [semesterKeys]);

  /* ================= OPEN / DOWNLOAD PDF ================= */
  const handlePdfPress = async (item) => {
    const pdfUrl = item.url;
    const fileName = pdfUrl.split("/").pop();
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      const exists = await RNFS.exists(localPath);

      // ✅ Already downloaded → open offline
      if (exists) {
        navigation.navigate("PdfViewer", {
          pdfUrl: `file://${localPath}`,
          title: item.name,
        });
        return;
      }

      // ✅ Open online immediately
      navigation.navigate("PdfViewer", {
        pdfUrl,
        title: item.name,
      });

      // ⬇️ Background download
      setProgressMap(p => ({ ...p, [fileName]: 0 }));

      RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: localPath,
        progressDivider: 1,
        progress: (res) => {
          if (res.contentLength > 0) {
            const percent = Math.floor(
              (res.bytesWritten / res.contentLength) * 100
            );
            setProgressMap(p => ({
              ...p,
              [fileName]: percent,
            }));
          }
        },
      }).promise.then(() => {
        setProgressMap(p => ({
          ...p,
          [fileName]: 100,
        }));
      });
    } catch (e) {
      console.log("Quantum PDF error", e);
      Alert.alert("Error", "Unable to open PDF");
    }
  };

  /* ================= LOADING ================= */
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

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      <TopNavbarBack title={subjectName} />

      <FlatList
        data={files}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const fileName = item.url.split("/").pop();
          const progress = progressMap[fileName];

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => handlePdfPress(item)}
            >
              <View style={styles.left}>
                <View style={styles.iconWrap}>
                  <Icon
                    name="document-outline"
                    size={22}
                    color="#ffffff"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.fileName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  {progress >= 0 && progress < 100 ? (
                    <>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${progress}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.meta}>
                        Downloading… {progress}%
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.meta}>
                      Tap to view PDF
                    </Text>
                  )}
                </View>
              </View>

              <Icon
                name="chevron-forward"
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          );
        }}
      />
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
      android: { elevation: 6 },
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

  progressBar: {
    height: 6,
    width: "100%",
    backgroundColor: "#1f2933",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
  },
});
