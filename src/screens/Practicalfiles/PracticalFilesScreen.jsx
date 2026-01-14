import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Platform, Modal } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";
import RNFS from 'react-native-fs';

const BASE_URL = "https://pub-96d515e7e6b74514adfe46d7eb1f7fbc.r2.dev";

const PracticalFilesScreen = () => {
  const route = useRoute();
  const { yearLevel, subjectName } = route.params || {};
  const navigation = useNavigation();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const url = `${BASE_URL}/practicals/${yearLevel}/index.json`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setFiles(data);
        } else {
          setFiles([]);
        }
      } catch (err) {
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [yearLevel]);

  const downloadAndOpenPdf = async (url, name) => {
    try {
      setDownloading(true);
      setDownloadProgress(0);
      const isIOS = Platform.OS === 'ios';
      const dir = isIOS ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
      const filePath = `${dir}/${name}`;
      const downloadOptions = {
        fromUrl: url,
        toFile: filePath,
        background: true,
        discretionary: true,
        progressDivider: 2,
        begin: () => setDownloadProgress(0),
        progress: (res) => {
          const progress = res.bytesWritten / res.contentLength;
          setDownloadProgress(progress);
        },
      };
      await RNFS.downloadFile(downloadOptions).promise;
      setDownloading(false);
      setDownloadProgress(1);
      navigation.navigate('PdfViewer', { filePath });
    } catch (e) {
      setDownloading(false);
      setDownloadProgress(0);
      alert('Download failed');
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
        <Text style={styles.emptyText}>No practical files found for {subjectName || yearLevel}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbarBack title={subjectName || yearLevel || "Practical Files"} />
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => downloadAndOpenPdf(item.url, item.name)}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="document-outline" size={22} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fileName}>{item.name}</Text>
                <Text style={styles.meta}>Tap to download & view PDF</Text>
              </View>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={downloading} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={{ color: '#fff', marginTop: 10 }}>Downloading PDF...</Text>
            <View style={{ width: 200, height: 10, backgroundColor: '#333', borderRadius: 5, marginTop: 16, overflow: 'hidden' }}>
              <View style={{ width: `${Math.round(downloadProgress * 100)}%`, height: 10, backgroundColor: '#22c55e' }} />
            </View>
            <Text style={{ color: '#fff', marginTop: 8 }}>{Math.round(downloadProgress * 100)}%</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PracticalFilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    padding: 16,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#141417',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    elevation: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  fileName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: '#9ca3af',
    fontSize: 12,
  },
  chev: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
  },
});
