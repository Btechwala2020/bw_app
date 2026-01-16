import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import RNFS from "react-native-fs";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

const BASE_URL =
  "https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev";

export default function PyqPdfListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { semesterKey, subjectKey, subjectName } = route.params;

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState({});

  /* ================= FETCH PYQs ================= */
  useEffect(() => {
    const url = `${BASE_URL}/${semesterKey}/${subjectKey}/index.json`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => {
          const y1 = parseInt(a.year?.split("-")[0] || 0, 10);
          const y2 = parseInt(b.year?.split("-")[0] || 0, 10);
          return y2 - y1;
        });
        setPdfs(sorted);
      })
      .catch(err => {
        console.log("PYQ JSON error", err);
        Alert.alert("Error", "Unable to load PYQs");
      })
      .finally(() => setLoading(false));
  }, [semesterKey, subjectKey]);

  /* ================= OPEN / DOWNLOAD PDF ================= */
  const handlePdfPress = async (item) => {
    const pdfUrl = `${BASE_URL}/${semesterKey}/${subjectKey}/${item.file}`;
    const fileName = item.file;
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      const exists = await RNFS.exists(localPath);

      // ✅ Offline open
      if (exists) {
        navigation.navigate("PdfViewer", {
          pdfUrl: `file://${localPath}`,
          title: item.name,
        });
        return;
      }

      // ✅ Open online immediately (in-app)
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
      console.log("PYQ PDF error", e);
      Alert.alert("Error", "Unable to open PDF");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Loading PYQs…</Text>
      </View>
    );
  }

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      <TopNavbarBack title={`${subjectName} PYQs`} />

      <Text style={styles.subtitle}>
        {semesterKey.toUpperCase()} · {pdfs.length} papers
      </Text>

      <FlatList
        data={pdfs}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => {
          const progress = progressMap[item.file];

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() => handlePdfPress(item)}
            >
              {/* LEFT */}
              <View style={styles.left}>
                <View style={styles.iconWrap}>
                  <Icon
                    name="document-text-outline"
                    size={22}
                    color="#ffffff"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.pdfName} numberOfLines={2}>
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
                      Year • {item.year || "N/A"}
                    </Text>
                  )}
                </View>
              </View>

              {/* RIGHT */}
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
    paddingHorizontal: 16,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#9ca3af",
    marginTop: 10,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 16,
    marginTop: 4,
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
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
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
  pdfName: {
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
