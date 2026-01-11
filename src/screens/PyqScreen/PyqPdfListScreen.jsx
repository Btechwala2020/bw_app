import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const BASE_URL =
  "https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev";

export default function PyqPdfListScreen() {
  const route = useRoute();
  const { semesterKey, subjectKey, subjectName } = route.params;

  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const url = `${BASE_URL}/${semesterKey}/${subjectKey}/index.json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => {
          const y1 = parseInt(a.year?.split("-")[0] || 0, 10);
          const y2 = parseInt(b.year?.split("-")[0] || 0, 10);
          return y2 - y1;
        });
        setPdfs(sorted);
      })
      .catch((err) => console.log("JSON fetch error", err));
  }, [semesterKey, subjectKey]);

  const openPdf = (file) => {
    const pdfUrl = `${BASE_URL}/${semesterKey}/${subjectKey}/${file}`;
    Linking.openURL(pdfUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => openPdf(item.file)}
    >
      {/* LEFT */}
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Icon name="document-text-outline" size={22} color="#ffffff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.pdfName}>{item.name}</Text>
          <Text style={styles.meta}>Year: {item.year || "N/A"}</Text>
        </View>
      </View>

      {/* RIGHT */}
      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subjectName} PYQs</Text>
      <Text style={styles.subtitle}>
        {semesterKey.toUpperCase()} · {pdfs.length} papers
      </Text>

      <FlatList
        data={pdfs}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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

  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 20,
  },

  /* CARD */
  card: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  pdfName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  meta: {
    color: "#9ca3af",
    fontSize: 12,
  },

  chev: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
  },
});
