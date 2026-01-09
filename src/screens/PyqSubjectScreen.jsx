import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';

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

const PyqSubjectScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { semesterKey } = route.params;
  
    const subjects = SUBJECTS_BY_SEM[semesterKey] || [];
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose Subject</Text>
  
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('PyqPdfList', {
                  semesterKey,
                  subjectKey: item.key,
                  subjectName: item.name,
                })
              }
            >
             

<View>
                 <Text style={styles.cardText}>{item.name}</Text>
                <Text style={styles.meta}>Tap to view PYQs</Text>
            </View>

            <View style={styles.arrowWrap}>
                <Text style={styles.arrow}>›</Text>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default PyqSubjectScreen;
  
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
    cardText: {
      color: '#fff',
      fontSize: 16,
    },
    arrow: {
      color: '#999',
      fontSize: 28,
      fontWeight: 'bold',
    },
    meta: {
      fontSize: 12,
      fontWeight: '400',
      color: '#FFFFFF',
    },
    meta: {
      marginTop: 4,
      fontSize: 13,
      color: '#B0B0B0',
    },
  });
  