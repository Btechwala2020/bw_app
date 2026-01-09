import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const BASE_URL =
  'https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev';

const PyqPdfListScreen = () => {
  const route = useRoute();
  const { semesterKey, subjectKey, subjectName } = route.params;

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  const getColorForKey = (key) => {
    if (!key) return COLORS[0];
    const sum = key.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    return COLORS[sum % COLORS.length];
  };

  useEffect(() => {
    const url = `${BASE_URL}/${semesterKey}/${subjectKey}/index.json`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          const yearA = parseInt(a.year?.split('-')[0] || 0);
          const yearB = parseInt(b.year?.split('-')[0] || 0);
          return yearB - yearA;
        });

        setPdfs(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log('JSON fetch error', err);
        setLoading(false);
      });
  }, []);

  const openPdf = (file) => {
    const pdfUrl = `${BASE_URL}/${semesterKey}/${subjectKey}/${file}`;
    Linking.openURL(pdfUrl);
  };

  const renderItem = ({ item }) => {
    const color = getColorForKey(subjectKey || subjectName);
    return (
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: color }]}
        onPress={() => openPdf(item.file)}
      >
        <View style={styles.cardInner}>
          <View style={[styles.iconCircle, { backgroundColor: color + '22' }]}>
            <Text style={[styles.iconDot, { color }]}>{(subjectName || subjectKey || '').charAt(0).toUpperCase()}</Text>
          </View>

          <View style={styles.textWrap}>
            <Text style={styles.pdfName}>{item.name}</Text>
            <Text style={styles.yearText}>Year: {item.year || 'N/A'}</Text>
          </View>
        </View>

        <View style={[styles.chev, { backgroundColor: color + '1a' }]}> 
          <Text style={[styles.chevText, { color }]}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
    backgroundColor: '#0f0f12',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconDot: {
    fontSize: 20,
    fontWeight: '800',
  },
  textWrap: {
    flex: 1,
  },
  pdfName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  yearText: {
    color: '#94a3af',
    marginTop: 6,
    fontSize: 12,
  },
  chev: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  chevText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
