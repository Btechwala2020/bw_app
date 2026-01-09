import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors';

const semesters = [
    { id: '1', key: 'sem1', title: 'Semester 1', subtitle: 'Foundation Subjects' },
    { id: '2', key: 'sem2', title: 'Semester 2', subtitle: 'Core Fundamentals' },
    { id: '3', key: 'sem3', title: 'Semester 3', subtitle: 'Engineering Core' },
    { id: '4', key: 'sem4', title: 'Semester 4', subtitle: 'Applied Concepts' },
    { id: '5', key: 'sem5', title: 'Semester 5', subtitle: 'Branch Specialization' },
    { id: '6', key: 'sem6', title: 'Semester 6', subtitle: 'Advanced Topics' },
    { id: '7', key: 'sem7', title: 'Semester 7', subtitle: 'Electives & Projects' },
    { id: '8', key: 'sem8', title: 'Semester 8', subtitle: 'Final Year & Viva' },
  ];
  

const PyqSemesterScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() =>
      
        // navigation.navigate('PyqYear', { semester: item.title })
        navigation.navigate('PyqSubjects', {
          semesterKey: item.key,
          semesterName: item.title,
        })
        
      }
      

    >
      <View>
        <Text style={styles.semTitle}>{item.title}</Text>
        <Text style={styles.semSub}>{item.subtitle}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>Choose Semester</Text>
        <Text style={styles.subHeading}>
          Select semester to view PYQs
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PyqSemesterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F', // deep premium black
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 30,
    marginBottom: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  subHeading: {
    marginTop: 6,
    fontSize: 14,
    color: '#9A9A9A',
  },

  card: {
    backgroundColor: '#171717', // glassy
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: COLORS.glass,

    // shadow (Android)
    elevation: 6,

    // border glow
    // borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.08)',
  },

  semTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  semSub: {
    marginTop: 4,
    fontSize: 13,
    color: '#B0B0B0',
  },

  arrow: {
    fontSize: 32,
    color: '#999', // accent pink
    fontWeight: '700',
  },
});
