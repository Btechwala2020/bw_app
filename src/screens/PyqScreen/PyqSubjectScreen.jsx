import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbarBack from "../../components/navigation/TopNavBarBack";
import PyqSemesterPicker from "./PyqSemesterPicker";

/* ================= SUBJECT DATA ================= */
/* (unchanged – same as tumhara) */
const SUBJECTS_BY_SEM = {
  sem1: [
    { name: "Engineering Chemistry", key: "chemistry" },
    { name: "Engineering Maths 1", key: "maths" },
    { name: "Engineering Physics", key: "physics" },
    { name: "Engineering Maths2", key: "maths2" },
    { name: "SoftSkill", key: "softskill" },
    { name: "Environment and Ecology", key: "environment" },
    { name: "Programming for Problem Solving", key: "pps" },
    { name: "Fundamentals of Electrical Engg", key: "electrical" },
    { name: "Fundamentals of Mechanical Engg", key: "mechanical" },
    { name: "Fundamentals of Elcectronics Engg", key: "electronics" },
  ],

  sem2: [
    { name: "Engineering Chemistry", key: "chemistry" },
    { name: "Engineering Maths 1", key: "maths1" },
    { name: "Engineering Physics", key: "physics" },
    { name: "Engineering Maths2", key: "maths2" },
    { name: "SoftSkill", key: "softskill" },
    { name: "Environment and Ecology", key: "environment" },
    { name: "Programming for Problem Solving", key: "pps" },
    { name: "Fundamentals of Electrical Engg", key: "electrical" },
    { name: "Fundamentals of Mechanical Engg", key: "mechanical" },
    { name: "Fundamentals of Elcectronics Engg", key: "electronics" },
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
    { name: "Object Oriented Programming with Java", key: "oop" },
    { name: "Technical Communication", key: "tc" },
    { name: "COA", key: "coa" },
    { name: "Microprocessor", key: "micro" },
    { name: "UHV", key: "uhv" },
    { name: "Theory of Automata and Formal Languages", key: "tafl" },
    { name: "Cyber Security", key: "cyber" },
    { name: "Python Programming", key: "python" },
  ],

  sem5: [
    { name: "Database Management System", key: "dbms" },
    { name: "Design and Analysis of Algorithm", key: "daa" },
    { name: "Web Technology", key: "wt" },
    { name: "Constitution of India", key: "coi" },
    { name: "Essence of Indian Traditional Knowledge", key: "eitk" },
    { name: "Data Analytics", key: "da" },
    { name: "Computer Graphics", key: "cg" },
    { name: "Object Oriented System Design with C++", key: "oosd" },
    { name: "Machine Learning Techniques", key: "ml" },
    { name: "Application of Soft Computing", key: "sc" },
    { name: "Image Processing", key: "ip" },
    { name: "Data Warehousing & Data Mining", key: "dwdm" },
  ],

  sem6: [
    { name: "Software Engineering", key: "se" },
    { name: "Compiler Design", key: "cd" },
    { name: "Computer Networks", key: "cn" },
    { name: "Constitution of India", key: "coi" },
    { name: "Essence of Indian Traditional Knowledge", key: "eitk" },
    { name: "Big Data", key: "bd" },
    { name: "Augmented & Virtual Reality", key: "arvr" },
    { name: "Blockchain Architecture Design", key: "bad" },
    { name: "Data Compression", key: "dc" },
    { name: "Data Analytics", key: "analytics" },
    { name: "Computer Graphics", key: "comgraphics" },
    { name: "Object Oriented System Design with C++", key: "oosdcpp" },
  ],

  sem7: [
    { name: "Artificial Intelligence", key: "ai" },
    { name: "Deep Learning", key: "dl" },
    { name: "Internet of Things", key: "iot" },
    { name: "Vision of Human Society", key: "vhs" },
    { name: "Renewable Energy Resources", key: "rer" },
    { name: "Project Management", key: "pme" },
    { name: "Intro To Women & Gender Studies", key: "itgs" },
    { name: "Cryptography and Network Security", key: "crypto" },
    { name: "Data Warehousing and Data Mining", key: "dwdm" },
    { name: "Cloud Computing", key: "cloud" },
    { name: "Rural Development Administration & Planning", key: "rdap" },
    { name: "Design Development of Application", key: "dda" },
    { name: "Natural Language Processing", key: "nlp" },
  ],

  sem8: [
    { name: "Artificial Intelligence", key: "ai" },
    { name: "Deep Learning", key: "dl" },
    { name: "Internet of Things", key: "iot" },
    { name: "Vision of Human Society", key: "vhs" },
    { name: "Renewable Energy Resources", key: "rer" },
    { name: "Project Management", key: "pme" },
    { name: "Intro To Women & Gender Studies", key: "itgs" },
    { name: "Cryptography and Network Security", key: "crypto" },
    { name: "Data Warehousing and Data Mining", key: "dwdm" },
    { name: "Cloud Computing", key: "cloud" },
    { name: "Rural Development Administration & Planning", key: "rdap" },
    { name: "Design Development of Application", key: "dda" },
    { name: "Natural Language Processing", key: "nlp" },
  ],
};

export default function PyqSubjectScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { semesters = [], yearLabel = "Subjects" } = route.params || {};
  const [selectedSubject, setSelectedSubject] = useState(null);

  /* 🔥 MERGE SUBJECTS */
  const subjectMap = {};
  semesters.forEach((sem) => {
    (SUBJECTS_BY_SEM[sem] || []).forEach((sub) => {
      if (!subjectMap[sub.key]) {
        subjectMap[sub.key] = { ...sub, semesters: [sem] };
      } else {
        subjectMap[sub.key].semesters.push(sem);
      }
    });
  });

  const subjectList = Object.values(subjectMap);

  return (
    <View style={styles.root}>
      <TopNavbarBack title={yearLabel} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>Subjects</Text>
        <Text style={styles.subHeading}>
          Select subject to view semester-wise PYQs
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={subjectList}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => setSelectedSubject(item)}
          >
            <View style={styles.left}>
              <View style={styles.iconWrap}>
                <Icon name="book-outline" size={20} color="#fff" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subText}>
                  SEM {item.semesters
                    .map((s) => s.replace("sem", ""))
                    .join(" • ")}
                </Text>
              </View>
            </View>

            <Icon
              name="chevron-forward"
              size={20}
              color="#d1d5db"
            />
          </TouchableOpacity>
        )}
      />

      {/* SEMESTER PICKER */}
      <PyqSemesterPicker
        visible={!!selectedSubject}
        semesters={selectedSubject?.semesters || []}
        onClose={() => setSelectedSubject(null)}
        onSelect={(sem) => {
          navigation.navigate("PyqPdfList", {
            semesterKey: sem,
            subjectKey: selectedSubject.key,
            subjectName: selectedSubject.name,
          });
          setSelectedSubject(null);
        }}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07070a",
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 8,
    marginBottom: 18,
  },

  heading: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  subHeading: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
  },

  card: {
    backgroundColor: "#141417",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // premium border
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

   iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  title: {
    color: "#ffffff",
    fontSize: 15.5,
    fontWeight: "700",
    lineHeight: 20,
  },

  subText: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
  },
});
