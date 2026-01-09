import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const YEAR_LEVELS = [
  { id: '1', level: '1st Year', subtitle: 'Semesters 1 & 2', color: '#3b82f6', sems: ['sem1', 'sem2'] },
  { id: '2', level: '2nd Year', subtitle: 'Semesters 3 & 4', color: '#8b5cf6', sems: ['sem3', 'sem4'] },
  { id: '3', level: '3rd Year', subtitle: 'Semesters 5 & 6', color: '#ec4899', sems: ['sem5', 'sem6'] },
  { id: '4', level: '4th Year', subtitle: 'Semesters 7 & 8', color: '#f59e0b', sems: ['sem7', 'sem8'] },
];

const PyqSemesterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrap}>
          <Text style={styles.title}>Select Year Level</Text>
          <Text style={styles.subtitle}>Find PYQs for your year</Text>
        </View>

        <View style={styles.grid}>
          {YEAR_LEVELS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={[styles.card, { borderLeftColor: item.color }]}
              onPress={() =>
                navigation.navigate('PyqSubjects', {
                  yearLevel: item.level,
                  semesters: item.sems,
                })
              }
            >
              <View style={styles.cardInner}>
                <View style={[styles.iconCircle, { backgroundColor: item.color + '22' }]}>
                  <View style={[styles.iconDot, { backgroundColor: item.color }]} />
                </View>

                <View style={styles.textWrap}>
                  <Text style={styles.cardTitle}>{item.level}</Text>
                  <Text style={styles.cardSub}>{item.subtitle}</Text>
                </View>
              </View>

              <View style={[styles.chev, { backgroundColor: item.color + '1a' }]}> 
                <Text style={[styles.chevText, { color: item.color }]}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PyqSemesterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#07070a',
  },
  container: {
    padding: 20,
    paddingTop: 28,
  },
  headerWrap: {
    marginBottom: 18,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 6,
    fontSize: 13,
  },
  grid: {
    marginTop: 6,
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
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  textWrap: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardSub: {
    color: '#9ca3af',
    marginTop: 4,
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
