import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";
import LoaderScreen from "../../components/LoaderScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function PyqPdfListScreen() {
  const navigation = useNavigation();
  const { semesterKey, subjectKey, subjectName } = useRoute().params;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);

        const url =
          `https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev/` +
          `${semesterKey}/${subjectKey}/index.json?ts=${Date.now()}`;

        const res = await fetch(url);
        const data = await res.json();

        if (isMounted) {
          setList(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) setList([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => (isMounted = false);
  }, [semesterKey, subjectKey]);

  /* ================= LOADER ================= */
  if (loading) {
    return <LoaderScreen text="Loading PYQs..." />;
  }

  /* ================= EMPTY ================= */
  if (list.length === 0) {
    return (
      <View style={styles.root}>
        <TopNavbarBack title={subjectName} />
        <Text style={styles.empty}>No PYQs available</Text>
      </View>
    );
  }

  /* ================= SUCCESS ================= */
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: "#07070a" }} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#07070a" translucent={false} />
    <View style={styles.root}>
      <TopNavbarBack title={subjectName} />

      <FlatList
        data={list}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() =>
              navigation.navigate("PdfViewer", {
                pdfUrl: item.url,
                title: item.name,
              })
            }
          >
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon
                  name="document-text-outline"
                  size={20}
                  color="#ffffff"
                />
              </View>

              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.year}>{item.year}</Text>
              </View>
            </View>

            {/* RIGHT */}
            <Icon name="chevron-forward" size={20} color="#d1d5db" />
          </TouchableOpacity>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 16,
  },

  card: {
    backgroundColor: "#141417",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // premium border
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

   iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  name: {
    color: "#ffffff",
    fontSize: 15.5,
    fontWeight: "700",
    lineHeight: 20,
  },

  year: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
  },

  empty: {
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
});
