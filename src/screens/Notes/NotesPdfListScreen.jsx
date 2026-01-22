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
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";

export default function NotesPdfListScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { semKey, subjectKey, noteType } = route.params;

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = `https://pub-ed489d6d9d3742bbae9f8e9c36388245.r2.dev/${semKey}/${subjectKey}/${noteType}/index.json`;

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        setPdfs(Array.isArray(json) ? json : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loading}>Preparing notes…</Text>
      </View>
    );
  }

  /* ===== EMPTY ===== */
  if (!pdfs.length) {
    return (
      <View style={styles.center}>
        <Icon name="folder-open-outline" size={42} color="#6b7280" />
        <Text style={styles.empty}>No PDFs available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbarBack title="Notes" />

      <FlatList
        data={pdfs}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.card}
            onPress={() =>
              navigation.navigate("PdfViewer", {
                pdfUrl: item.url,
                title: item.title,
              })
            }
          >
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.fileIcon}>
                <Icon
                  name="document-text-outline"
                  size={26}
                  color="#fff"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.metaRow}>
                  <Icon
                    name="eye-outline"
                    size={13}
                    color="#9ca3af"
                  />
                  <Text style={styles.metaText}>
                    Tap to view
                  </Text>
                </View>
              </View>
            </View>

            {/* RIGHT */}
            <View style={styles.right}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>PDF</Text>
              </View>
              <Icon
                name="chevron-forward"
                size={22}
                color="#9ca3af"
              />
            </View>
          </TouchableOpacity>
        )}
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
    flex: 1,
    backgroundColor: "#07070a",
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    color: "#9ca3af",
    marginTop: 10,
    fontSize: 13,
  },

  empty: {
    color: "#9ca3af",
    marginTop: 10,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 14,
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

  fileIcon: {
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
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    color: "#9ca3af",
    fontSize: 12,
    marginLeft: 6,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },

  badgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});
