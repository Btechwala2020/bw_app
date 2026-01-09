import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const BASE_URL = 'https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev/quantum';

const YEAR_MAPPING = {
  '1st Year': ['sem1', 'sem2'],
  '2nd Year': ['sem3', 'sem4'],
  '3rd Year': ['sem5', 'sem6'],
  '4th Year': ['sem7', 'sem8'],
};

const SUBJECTS_BY_SEM = {
  sem1: ['chemistry', 'maths', 'physics', 'maths2', 'softskill', 'environment', 'pps', 'electrical', 'mechanical', 'electronics'],
  sem2: ['chemistry', 'maths1', 'physics', 'maths2', 'softskill', 'environment', 'pps', 'electrical', 'mechanical', 'electronics'],
  sem3: ['dsa', 'digital', 'dstl', 'cyber', 'python', 'uhv', 'tc', 'coa', 'maths4'],
  sem4: ['os', 'maths4', 'digital', 'oop', 'tc', 'coa', 'micro', 'uhv', 'tafl', 'cyber', 'python'],
  sem5: ['dbms', 'daa', 'wt', 'coi', 'eitk', 'da', 'cg', 'oosd', 'ml', 'sc', 'ip', 'dwdm'],
  sem6: ['se', 'cd', 'cn', 'coi', 'eitk', 'bd', 'arvr', 'bad', 'dc', 'analytics', 'comgraphics', 'oosdc++'],
  sem7: ['ai', 'dl', 'iot', 'vhs', 'rer', 'pme', 'itgs', 'crypto', 'dwdm', 'cloud', 'rdap', 'dda', 'nlp'],
  sem8: ['ai', 'dl', 'iot', 'vhs', 'rer', 'pme', 'itgs', 'crypto', 'dwdm', 'cloud', 'rdap', 'dda', 'nlp'],
};

const QuantumPdfListScreen = () => {
  const route = useRoute();
  const { yearLevel } = route.params;

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPapers = async () => {
      try {
        const semesters = YEAR_MAPPING[yearLevel] || [];
        let allPapers = [];

        // Fetch papers from all semesters for this year level
        for (const semesterKey of semesters) {
          const subjects = SUBJECTS_BY_SEM[semesterKey] || [];

          for (const subjectKey of subjects) {
            try {
              const url = `${BASE_URL}/${semesterKey}/${subjectKey}/index.json`;
              const response = await fetch(url);
              
              if (response.ok) {
                const data = await response.json();
                // Add semester and subject info to each paper
                const papersWithMetadata = data.map((paper) => ({
                  ...paper,
                  semesterKey,
                  subjectKey,
                }));
                allPapers = [...allPapers, ...papersWithMetadata];
              }
            } catch (err) {
              console.log(`Error fetching ${semesterKey}/${subjectKey}:`, err);
            }
          }
        }

        // Sort by year (latest first)
        const sortedPapers = allPapers.sort((a, b) => {
          const yearA = parseInt(a.year?.split('-')[0] || 0);
          const yearB = parseInt(b.year?.split('-')[0] || 0);
          return yearB - yearA;
        });

        setPdfs(sortedPapers);
        setLoading(false);
      } catch (err) {
        console.log('Error fetching papers:', err);
        setLoading(false);
      }
    };

    fetchAllPapers();
  }, [yearLevel]);

  const openPdf = (semesterKey, subjectKey, file) => {
    const pdfUrl = `${BASE_URL}/${semesterKey}/${subjectKey}/${file}`;
    Linking.openURL(pdfUrl);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openPdf(item.semesterKey, item.subjectKey, item.file)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.pdfName}>{item.name}</Text>
        <Text style={styles.semesterText}>
          {item.semesterKey.toUpperCase()} • {item.subjectKey}
        </Text>
        <Text style={styles.yearText}>
          Year: {item.year || 'N/A'}
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Loading Quantum Papers...</Text>
      </View>
    );
  }

  if (pdfs.length === 0) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.emptyText}>No papers available for {yearLevel}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{yearLevel} Quantum Papers</Text>
      <Text style={styles.subtitle}>{pdfs.length} papers found</Text>

      <FlatList
        data={pdfs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default QuantumPdfListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    padding: 16,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
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
    fontWeight: '500',
    marginBottom: 6,
  },
  semesterText: {
    color: '#22c55e',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  yearText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  arrow: {
    color: '#999',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
  },
});
