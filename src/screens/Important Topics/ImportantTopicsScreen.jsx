import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BASE_URL = 'https://pub-8d76bb5c3d9f47529f84f1c651531e3a.r2.dev';

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

const SUBJECT_NAMES = {
  chemistry: 'Engineering Chemistry',
  maths: 'Engineering Maths 1',
  maths1: 'Engineering Maths 1',
  maths2: 'Engineering Maths 2',
  maths4: 'Maths 4',
  physics: 'Engineering Physics',
  softskill: 'SoftSkill',
  environment: 'Environment and Ecology',
  pps: 'Programming for Problem Solving',
  electrical: 'Fundamentals of Electrical Engg',
  mechanical: 'Fundamentals of Mechanical Engg',
  electronics: 'Fundamentals of Electronics Engg',
  dsa: 'Data Structures',
  digital: 'Digital Electronics',
  dstl: 'DSTL',
  cyber: 'Cyber Security',
  python: 'Python Programming',
  uhv: 'UHV',
  tc: 'Technical Communication',
  coa: 'COA',
  os: 'Operating System',
  oop: 'OOP with Java',
  micro: 'Microprocessor',
  tafl: 'Theory of Automata and Formal Languages',
  dbms: 'Database Management System',
  daa: 'Design & Analysis of Algorithms',
  wt: 'Web Technology',
  coi: 'Constitution of India',
  eitk: 'Essence of Indian Traditional Knowledge',
  da: 'Data Analytics',
  cg: 'Computer Graphics',
  oosd: 'Object Oriented System Design with C++',
  ml: 'Machine Learning Techniques',
  sc: 'Application of Soft Computing',
  ip: 'Image Processing',
  dwdm: 'Data Warehousing & Data Mining',
  se: 'Software Engineering',
  cd: 'Compiler Design',
  cn: 'Computer Networks',
  bd: 'Big Data',
  arvr: 'Augmented & Virtual Reality',
  bad: 'Blockchain Architecture Design',
  dc: 'Data Compression',
  analytics: 'Data Analytics',
  comgraphics: 'Computer Graphics',
  oosdc: 'Object Oriented System Design with C++',
  ai: 'Artificial Intelligence',
  dl: 'Deep Learning',
  iot: 'Internet of Things',
  vhs: 'Vision of Human Society',
  rer: 'Renewable Energy Resources',
  pme: 'Project Management',
  itgs: 'Intro To Women & Gender Studies',
  crypto: 'Cryptography and Network Security',
  cloud: 'Cloud Computing',
  rdap: 'Rural Development Administration & planning',
  dda: 'Design Development of Application',
  nlp: 'Natural Language Processing',
};

const ImportantTopicsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { yearLevel } = route.params;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectsFromCloudflare = async () => {
      try {
        const semesters = YEAR_MAPPING[yearLevel] || [];
        let allSubjects = [];

        for (const semesterKey of semesters) {
          const subjectKeys = SUBJECTS_BY_SEM[semesterKey] || [];

          for (const subjectKey of subjectKeys) {
            try {
              const url = `${BASE_URL}/${semesterKey}/${subjectKey}/index.json`;
              const response = await fetch(url);

              if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                  allSubjects.push({
                    id: subjectKey,
                    key: subjectKey,
                    name: SUBJECT_NAMES[subjectKey] || subjectKey,
                    semester: semesterKey,
                    papersCount: data.length,
                  });
                }
              }
            } catch (err) {
              console.log(`Error fetching ${semesterKey}/${subjectKey}:`, err);
            }
          }
        }

        setSubjects(allSubjects);
        setLoading(false);
      } catch (err) {
        console.log('Error fetching subjects:', err);
        setLoading(false);
      }
    };

    fetchSubjectsFromCloudflare();
  }, [yearLevel]);

  const renderSubjectItem = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectCard}
      onPress={() => {
        console.log('Subject clicked:', item.name);
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.subjectName}>{item.name}</Text>
        <Text style={styles.paperCount}>{item.papersCount} papers</Text>
      </View>
      <Text style={styles.semesterLabel}>{item.semester.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Loading subjects...</Text>
      </View>
    );
  }

  if (subjects.length === 0) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.emptyText}>No subjects found for {yearLevel}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 {yearLevel}</Text>
      <Text style={styles.subHeading}>{subjects.length} subjects available</Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={renderSubjectItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ImportantTopicsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    padding: 16,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 15,
    color: '#9ca3af',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 30,
  },
  subjectCard: {
    backgroundColor: '#171717',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  paperCount: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  semesterLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
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
