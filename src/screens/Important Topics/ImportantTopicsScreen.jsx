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

const BASE_URL = "https://pub-96d515e7e6b74514adfe46d7eb1f7fbc.r2.dev";

const ImportantTopicsScreen = () => {
  const route = useRoute();
  const { semesterKeys = [], subjectName } = route.params || {};

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllFiles = async () => {
      try {
        let allFiles = [];

        for (const sem of semesterKeys) {
          const url = `${BASE_URL}/${sem}/index.json`;
          console.log("📡 Fetching:", url);

          const res = await fetch(url);
          console.log("📄 Response status:", res.status);

          if (res.ok) {
            const data = await res.json();
            allFiles = [...allFiles, ...data];
          } else {
            console.warn(`⚠️ No files found in ${sem}`);
          }
        }

        setFiles(allFiles);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFiles();
  }, [semesterKeys]);

  const openPdf = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Unable to open file");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Loading files...</Text>
      </View>
    );
  }

  if (!files.length) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>No files found for {subjectName}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbarBack title={subjectName || "PYQ List"} />
      

      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => openPdf(item.url)}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="document-outline" size={22} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fileName}>{item.name}</Text>
                <Text style={styles.meta}>Tap to open PDF</Text>
              </View>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ImportantTopicsScreen;

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
    fontSize: 14,
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: 15,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    marginTop: 30,
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 20,
    // marginBottom: 16,
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
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  fileName: {
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
