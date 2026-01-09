import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GradientBackground from '../../components/GradientBackground';

const SUBJECTS_BY_SEM = {
    sem1: [
        { name: 'Engineering Chemistry', key: 'chemistry' },
        { name: 'Engineering Maths 1', key: 'maths' },
        { name: 'Engineering Physics', key: 'physics' },
        { name: 'Engineering Maths2', key: 'maths2' },
        { name: 'SoftSkill', key: 'softskill' },
        { name: 'Environment and Ecology', key: 'environment' },
        { name: 'Programming for Problem Solving', key: 'pps' },
        { name: 'Fundamentals of Electrical Engg', key: 'electrical' },
        { name: 'Fundamentals of Mechanical Engg', key: 'mechanical' },
        { name: 'Fundamentals of Elcectronics Engg', key: 'electronics' },
      

    ],
    sem2: [
        { name: 'Engineering Chemistry', key: 'chemistry' },
        { name: 'Engineering Maths 1', key: 'maths1' },
        { name: 'Engineering Physics', key: 'physics' },
        { name: 'Engineering Maths2', key: 'maths2' },
        { name: 'SoftSkill', key: 'softskill' },
        { name: 'Environment and Ecology', key: 'environment' },
        { name: 'Programming for Problem Solving', key: 'pps' },
        { name: 'Fundamentals of Electrical Engg', key: 'electrical' },
        { name: 'Fundamentals of Mechanical Engg', key: 'mechanical' },
        { name: 'Fundamentals of Elcectronics Engg', key: 'electronics' },
    ],
    sem3: [
        { name: 'Data Structures', key: 'dsa' },
        { name: 'Digital Electronics', key: 'digital' },
        { name: 'DSTL', key: 'dstl' },
        { name: 'Cyber Secuirity', key: 'cyber' },
        { name: 'Python Programming', key: 'python' },
        { name: 'UHV', key: 'uhv' },
        { name: 'Technical Communication', key: 'tc' },
        { name: 'COA', key: 'coa' },
        { name: 'Maths 4', key: 'maths4' },
        
    ],
    sem4: [
        { name: 'Operating System', key: 'os' },
        { name: 'Maths 4', key: 'maths4' },
        { name: 'Digital Electronics', key: 'digital' },
        { name: 'Object Oriented Programming with Java', key: 'oop' },
        { name: 'Technical Communication', key: 'tc' },
        { name: 'COA', key: 'coa' },
        { name: 'Microprocessor', key: 'micro' },
        { name: 'UHV', key: 'uhv' },
        { name: 'Theory of Automata and Formal Languages', key: 'tafl' },
        { name: 'Cyber Secuirity', key: 'cyber' },
        { name: 'Python Programming', key: 'python' },
        
    ],
    sem5: [
        { name: 'Database Management System', key: 'dbms' },
        { name: 'Design and Analysis of Algorithm', key: 'daa' },
        { name: 'Web Technology', key: 'wt'},
        { name: 'Constitution of India', key: 'coi' },
        { name: 'Essence of Indian Traditional Knowledge', key: 'eitk' },
        { name: 'Data Analytics', key: 'da' },
        { name: 'Computer Graphics', key: 'cg' },
        { name: 'Object Oriented System Design with C++', key: 'oosd' },
        { name: 'Machine Learning Techniques', key: 'ml' },
        { name: 'Application of Soft Computing', key: 'sc' },
        { name: 'Image Processing', key: 'ip' },
        { name: 'Data Warehousing & Data Mining', key: 'dwdm' },
    ],
    sem6: [
        { name: 'Software Engineering', key: 'se' },
        { name: 'Compiler Design', key: 'cd' },
        { name: 'Computer Networks', key: 'cn' },
        { name: 'Constitution of India', key: 'coi' },
        { name: 'Essence of Indian Traditional Knowledge', key: 'eitk' },
        { name: 'Big Data', key: 'bd' },
        { name: 'Augmented & Virtual Reality', key: 'arvr' },
        { name: 'Blockchain Architecture Design', key: 'bad' },
        { name: 'Data Compression', key: 'dc' },
        { name: 'Data Analytics', key: 'analytics' },
        { name: 'Computer Graphics', key: 'comgraphics' },
        { name: 'Object Oriented System Design with C++', key: 'oosdc++' },
    ],

    sem7: [
        { name: 'Artificial Intelligience', key: 'ai' },
        { name: 'Deep Learning', key: 'dl' },
        { name: 'Internet of Things', key: 'iot' },
        { name: 'Vision of Human Society', key: 'vhs' },
        { name: 'renewebal Energy Resources', key: 'rer' },
        { name: 'Project Management', key: 'pme' },
        { name: 'Intro To women & Gender Studies', key: 'itgs' },
        { name: 'cryptography and Network Security', key: 'crypto' },
        { name: 'Data Warehousing and Data Mining', key: 'dwdm' },
        { name: 'Cloud Computing', key: 'cloud' },
        { name: 'Rural Development Administration & planning', key: 'rdap' },
        { name: 'Design Development of Application', key: 'dda' },
        { name: 'Natural language processing', key: 'nlp' },

    ],
    sem8: [
        { name: 'Artificial Intelligience', key: 'ai' },
        { name: 'Deep Learning', key: 'dl' },
        { name: 'Internet of Things', key: 'iot' },
        { name: 'Vision of Human Society', key: 'vhs' },
        { name: 'renewebal Energy Resources', key: 'rer' },
        { name: 'Project Management', key: 'pme' },
        { name: 'Intro To women & Gender Studies', key: 'itgs' },
        { name: 'cryptography and Network Security', key: 'crypto' },
        { name: 'Data Warehousing and Data Mining', key: 'dwdm' },
        { name: 'Cloud Computing', key: 'cloud' },
        { name: 'Rural Development Administration & planning', key: 'rdap' },
        { name: 'Design Development of Application', key: 'dda' },
        { name: 'Natural language processing', key: 'nlp' },

       
    ],
};

const YEAR_MAPPING = {
  '1st Year': ['sem1', 'sem2'],
  '2nd Year': ['sem3', 'sem4'],
  '3rd Year': ['sem5', 'sem6'],
  '4th Year': ['sem7', 'sem8'],
};

const PyqSubjectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { semesterKey, yearLevel, semesters } = route.params || {};

  let subjects = [];

  if (yearLevel) {
    const sems = YEAR_MAPPING[yearLevel] || semesters || [];
    const map = {};
    sems.forEach((s) => {
      const arr = SUBJECTS_BY_SEM[s] || [];
      arr.forEach((sub) => {
        if (!map[sub.key]) map[sub.key] = sub.name;
      });
    });
    subjects = Object.keys(map).map((k) => ({ key: k, name: map[k] }));
  } else if (semesterKey) {
    subjects = SUBJECTS_BY_SEM[semesterKey] || [];
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  const getColorForKey = (key) => {
    if (!key) return COLORS[0];
    const sum = key.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    return COLORS[sum % COLORS.length];
  };

  const findSemesterForSubject = (subjectKey, yearLevelParam) => {
    if (semesterKey) return semesterKey;
    const sems = YEAR_MAPPING[yearLevelParam] || semesters || [];
    for (const s of sems) {
      const arr = SUBJECTS_BY_SEM[s] || [];
      if (arr.find((x) => x.key === subjectKey)) return s;
    }
    return sems[0] || 'sem1';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{yearLevel ? yearLevel : (semesterKey || '').toUpperCase()}</Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          const color = getColorForKey(item.key);
          const targetSemester = findSemesterForSubject(item.key, yearLevel);
          return (
            <TouchableOpacity
              style={[styles.card, { borderLeftColor: color }]}
              onPress={() =>
                navigation.navigate('PyqPdfList', {
                  semesterKey: targetSemester,
                  subjectKey: item.key,
                  subjectName: item.name,
                })
              }
            >
              <View style={styles.cardInner}>
                <View style={[styles.iconCircle, { backgroundColor: color + '22' }]}>
                  <Text style={[styles.iconDot, { color }]}>{item.name.charAt(0)}</Text>
                </View>

                <View style={styles.textWrap}>
                  <Text style={styles.cardText}>{item.name}</Text>
                  <Text style={styles.meta}>Tap to view PYQs</Text>
                </View>
              </View>

              <View style={[styles.chev, { backgroundColor: color + '1a' }]}> 
                <Text style={[styles.chevText, { color }]}>›</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
  
  export default PyqSubjectScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#07070a',
      padding: 16,
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 14,
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
      color: '#fff'
    },
    textWrap: {
      flex: 1,
    },
    cardText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
    meta: {
      marginTop: 6,
      fontSize: 12,
      color: '#9ca3af',
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
  