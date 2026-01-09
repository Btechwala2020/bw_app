import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const BASE_URL =
  'https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev';

const PyqPdfListScreen = () => {
  const route = useRoute();
  const { semesterKey, subjectKey, subjectName } = route.params;

  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const url = `${BASE_URL}/${semesterKey}/${subjectKey}/index.json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // ✅ SORT BY YEAR (LATEST FIRST)
        const sortedData = data.sort((a, b) => {
          const yearA = parseInt(a.year?.split('-')[0] || 0);
          const yearB = parseInt(b.year?.split('-')[0] || 0);
          return yearB - yearA;
        });

        setPdfs(sortedData);
      })
      .catch((err) => console.log('JSON fetch error', err));
  }, []);

  const openPdf = (file) => {
    const pdfUrl = `${BASE_URL}/${semesterKey}/${subjectKey}/${file}`;
    Linking.openURL(pdfUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openPdf(item.file)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.pdfName}>{item.name}</Text>

        {/* ✅ YEAR DISPLAY */}
        <Text style={styles.yearText}>
          Year: {item.year || 'N/A'}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subjectName} PYQs</Text>

      <FlatList
        data={pdfs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PyqPdfListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#171717',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pdfName: {
    color: '#fff',
    fontSize: 15,
  },
  yearText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  arrow: {
    color: '#999',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
