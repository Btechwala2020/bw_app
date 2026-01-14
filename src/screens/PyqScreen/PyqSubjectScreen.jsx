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
import Icon from 'react-native-vector-icons/Ionicons';
import TopNavbarBack from '../../components/navigation/TopNavBarBack';

/* ================= SUBJECT DATA ================= */

const SUBJECTS_BY_SEM = {
  sem1: [
    { name: "Engineering Chemistry", key: "chemistry" },
    { name: "Engineering Maths 1", key: "maths" },
    { name: "Engineering Physics", key: "physics" },
    { name: "Engineering Maths 2", key: "maths2" },
    { name: "Soft Skill", key: "softskill" },
    { name: "Environment and Ecology", key: "environment" },
    { name: "Programming for Problem Solving", key: "pps" },
    { name: "Fundamentals of Electrical Engg", key: "electrical" },
    { name: "Fundamentals of Mechanical Engg", key: "mechanical" },
    { name: "Fundamentals of Electronics Engg", key: "electronics" },
  ],
  sem2: [
    { name: "Engineering Chemistry", key: "chemistry" },
    { name: "Engineering Maths 1", key: "maths1" },
    { name: "Engineering Physics", key: "physics" },
    { name: "Engineering Maths 2", key: "maths2" },
    { name: "Soft Skill", key: "softskill" },
    { name: "Environment and Ecology", key: "environment" },
    { name: "Programming for Problem Solving", key: "pps" },
    { name: "Fundamentals of Electrical Engg", key: "electrical" },
    { name: "Fundamentals of Mechanical Engg", key: "mechanical" },
    { name: "Fundamentals of Electronics Engg", key: "electronics" },
  ],
  sem3: [
    { name: "Data Structures", key: "dsa" },
    { name: "Digital Electronics", key: "digital" },
    { name: "DSTL", key: "dstl" },
    { name: "Cyber Security", key: "cyber" },
    { name: "Python Programming", key: "python" },
    { name: "UHV", key: "uhv" },
    { name: "Technical Communication", key: "tc" },
    { name: "COA", key: "coa" },
    { name: "Maths 4", key: "maths4" },
  ],
  sem4: [
    { name: "Operating System", key: "os" },
    { name: "Maths 4", key: "maths4" },
    { name: "Digital Electronics", key: "digital" },
    { name: "OOP with Java", key: "oop" },
    { name: "Technical Communication", key: "tc" },
    { name: "COA", key: "coa" },
    { name: "Microprocessor", key: "micro" },
    { name: "UHV", key: "uhv" },
    { name: "TAFL", key: "tafl" },
    { name: "Cyber Security", key: "cyber" },
    { name: "Python Programming", key: "python" },
  ],
  sem5: [
    { name: "DBMS", key: "dbms" },
    { name: "DAA", key: "daa" },
    { name: "Web Technology", key: "wt" },
    { name: "COI", key: "coi" },
    { name: "EITK", key: "eitk" },
    { name: "Data Analytics", key: "da" },
    { name: "Computer Graphics", key: "cg" },
    { name: "OOSD with C++", key: "oosd" },
    { name: "Machine Learning", key: "ml" },
  ],
  sem6: [
    { name: "Software Engineering", key: "se" },
    { name: "Compiler Design", key: "cd" },
    { name: "Computer Networks", key: "cn" },
    { name: "COI", key: "coi" },
    { name: "EITK", key: "eitk" },
    { name: "Big Data", key: "bd" },
    { name: "AR / VR", key: "arvr" },
    { name: "Blockchain", key: "bad" },
  ],
  sem7: [
    { name: "Artificial Intelligence", key: "ai" },
    { name: "Deep Learning", key: "dl" },
    { name: "IoT", key: "iot" },
    { name: "Cloud Computing", key: "cloud" },
  ],
  sem8: [
    { name: "Artificial Intelligence", key: "ai" },
    { name: "Deep Learning", key: "dl" },
    { name: "IoT", key: "iot" },
    { name: "Cloud Computing", key: "cloud" },
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
      (SUBJECTS_BY_SEM[s] || []).forEach((sub) => {
        if (!map[sub.key]) map[sub.key] = sub.name;
      });
    });
    subjects = Object.keys(map).map((k) => ({ key: k, name: map[k] }));
  } else if (semesterKey) {
    subjects = SUBJECTS_BY_SEM[semesterKey] || [];
  }

  const findSemesterForSubject = (subjectKey) => {
    if (semesterKey) return semesterKey;
    const sems = YEAR_MAPPING[yearLevel] || semesters || [];
    for (const s of sems) {
      if ((SUBJECTS_BY_SEM[s] || []).find((x) => x.key === subjectKey)) {
        return s;
      }
    }
    return sems[0];
  };

  return (
    <View style={styles.container}>
       <TopNavbarBack title="PYQ" />
      <Text style={styles.title}>
        {yearLevel ? yearLevel : (semesterKey || '').toUpperCase()}
      </Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              navigation.navigate('PyqPdfList', {
                semesterKey: findSemesterForSubject(item.key),
                subjectKey: item.key,
                subjectName: item.name,
              })
            }
          >
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="book-outline" size={22} color="#ffffff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.subjectName}>{item.name}</Text>
                <Text style={styles.meta}>Tap to view PYQs</Text>
              </View>
            </View>

            {/* RIGHT */}
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PyqSubjectScreen;

/* ===== STYLES : SAME AS OTHER SCREENS ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07070a',
    padding: 16,
  },

  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
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

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      },
      android: {
        elevation: 10,
      },
    }),
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

  subjectName: {
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
