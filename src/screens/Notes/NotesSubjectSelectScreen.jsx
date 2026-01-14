import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import TopNavbarBack from '../../components/navigation/TopNavBarBack';
import Icon from 'react-native-vector-icons/Ionicons';

const SUBJECTS_BY_YEAR = {
  '1st Year': [
    { name: 'Engineering Chemistry', key: 'chemistry' },
    { name: 'Engineering Maths 1', key: 'maths1' },
    { name: 'Engineering Physics', key: 'physics' },
    { name: 'Soft Skill', key: 'softskill' },
    { name: 'Environment and Ecology', key: 'environment' },
    { name: 'Programming for Problem Solving', key: 'pps' },
    { name: 'Fundamentals of Electrical Engg', key: 'electrical' },
    { name: 'Fundamentals of Mechanical Engg', key: 'mechanical' },
    { name: 'Fundamentals of Electronics Engg', key: 'electronics' },
  ],
  '2nd Year': [
    { name: 'Data Structures', key: 'dsa' },
    { name: 'Digital Electronics', key: 'digital' },
    { name: 'Python Programming', key: 'python' },
    { name: 'Technical Communication', key: 'tc' },
    { name: 'COA', key: 'coa' },
    { name: 'Maths 4', key: 'maths4' },
    { name: 'Operating System', key: 'os' },
    { name: 'OOP with Java', key: 'oop' },
    { name: 'Microprocessor', key: 'micro' },
  ],
  '3rd Year': [
    { name: 'DBMS', key: 'dbms' },
    { name: 'DAA', key: 'daa' },
    { name: 'Web Technology', key: 'wt' },
    { name: 'COI', key: 'coi' },
    { name: 'EITK', key: 'eitk' },
    { name: 'Data Analytics', key: 'da' },
    { name: 'Computer Graphics', key: 'cg' },
    { name: 'OOSD with C++', key: 'oosd' },
    { name: 'Machine Learning', key: 'ml' },
    { name: 'Software Engineering', key: 'se' },
    { name: 'Compiler Design', key: 'cd' },
    { name: 'Computer Networks', key: 'cn' },
    { name: 'Big Data', key: 'bd' },
    { name: 'AR / VR', key: 'arvr' },
    { name: 'Blockchain', key: 'bad' },
  ],
  '4th Year': [
    { name: 'Artificial Intelligence', key: 'ai' },
    { name: 'Deep Learning', key: 'dl' },
    { name: 'IoT', key: 'iot' },
    { name: 'Cloud Computing', key: 'cloud' },
  ],
};

export default function NotesSubjectSelectScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { yearLevel } = route.params || {};
  const subjects = SUBJECTS_BY_YEAR[yearLevel] || [];

  return (
    <View style={styles.container}>
      <TopNavbarBack title="Select Subject" />
      <Text style={styles.title}>{yearLevel || 'Select Year'}</Text>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation.navigate('NotesScreen', { subjectKey: item.key, subjectName: item.name })}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="book-outline" size={22} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>{item.name}</Text>
                <Text style={styles.meta}>Tap to view notes</Text>
              </View>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07070a', padding: 16 },
  title: { color: '#ffffff', fontSize: 22, fontWeight: '700', marginBottom: 16 },
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
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
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
  iconText: { fontSize: 22 },
  subjectName: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  meta: { color: '#9ca3af', fontSize: 12 },
  chev: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
});
