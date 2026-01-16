import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import TopNavbar from "../components/navigation/TopNavbar";
import BottomNav from "../components/navigation/BottomNav";
 import { Linking } from "react-native";
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 80) / 3;
const SLIDER_HEIGHT = 200;

export default function HomeScreen() {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { uri: "https://plus.unsplash.com/premium_photo-1733317312273-a37561012283?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1714976326729-1ffbddfc1c2e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://plus.unsplash.com/premium_photo-1683535508596-9216de2ad64b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://plus.unsplash.com/premium_photo-1661587788491-a8b16ce7583a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    
    
  ];

  // Auto scroll slider
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const FEATURES = [
    { id: 1, title: "PYQ", icon: "document-text-outline", onPress: () => navigation.navigate("PyqSemester") },
    { id: 2, title: "Notes", icon: "book-outline", onPress: () => navigation.navigate("Notes") },
    { id: 3, title: "Quantum", icon: "bulb-outline", onPress: () => navigation.navigate("QuantumYearLevel") },
        { id: 4, title: "Imp Topic", icon: "layers-outline", onPress: () => navigation.navigate("TopicsYearLevel") },
    // { id: 5, title: "Books", icon: "bookmarks-outline", onPress: () => navigation.navigate("Books") },
    { id: 6, title: "Practical Files", icon: "notifications-outline", onPress: () => navigation.navigate("Updates") },
 

{
  id: 7,
  title: "AKTU Result",
  icon: "help-circle-outline",
  onPress: () => {
    Linking.openURL(
      "https://erp.aktu.ac.in/webpages/oneview/oneview.aspx"
    );
  },
},




  ];

  const PYQ_YEARS = [
    { id: "1", year: "First Year", subtitle: "Sem 1 & 2" },
    { id: "2", year: "Second Year", subtitle: "Sem 3 & 4" },
    { id: "3", year: "Third Year", subtitle: "Sem 5 & 6" },
    { id: "4", year: "Fourth Year", subtitle: "Sem 7 & 8" },
  ];

  const NOTES = [
    { id: "1", title: "First Year", subtitle: "Sem 1 & 2" },
    { id: "2", title: "Second Year", subtitle: "Sem 3 & 4" },
    { id: "3", title: "Third Year", subtitle: "Sem 5 & 6" },
    { id: "4", title: "Fourth Year", subtitle: "Sem 7 & 8" },
  ];

  const QUANTUM = [
    { id: "1", title: "First Year", subtitle: "Sem 1 & 2" },
    { id: "2", title: "Second Year", subtitle: "Sem 3 & 4" },
    { id: "3", title: "Third Year", subtitle: "Sem 5 & 6" },
    { id: "4", title: "Fourth Year", subtitle: "Sem 7 & 8" },
  ];

  return (
    <View style={styles.root}>
      <TopNavbar title="Home" showBack={false} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ─── SLIDER ───────────────────────── */}
        <FlatList
          ref={flatListRef}
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <Image source={item} style={styles.bannerImage} />}
        />

        {/* Dots */}
        <View style={styles.dots}>
          {banners.map((_, i) => (
            <View key={i} style={[styles.dot, { opacity: i === currentIndex ? 1 : 0.3 }]} />
          ))}
        </View>

        {/* ─── TEXT ───────────────────────── */}
        <Text style={styles.heading}>Welcome 👋</Text>
        <Text style={styles.subHeading}>
          Explore PYQs, Notes & Quantum Materials
        </Text>

        {/* ─── QUICK ACCESS ───────────────────────── */}
        <View style={styles.grid}>
          {FEATURES.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={styles.featureCard}
              onPress={item.onPress}
            >
              <View style={styles.featureIconWrap}>
                <Icon name={item.icon} size={26} color="#fff" />
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ─── PYQ SECTION ───────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Year Questions</Text>
          <TouchableOpacity onPress={() => navigation.navigate("PyqSemester")}>
            <Text style={[styles.viewAll, { color: "#fff" }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {PYQ_YEARS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.scrollCard, { borderColor: "#facc15" }]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("PyqSemester")}
            >
              <Icon name="school-outline" size={24} color="#facc15" style={{ marginBottom: 10 }} />
              <Text style={styles.scrollTitle}>{item.year}</Text>
              <Text style={styles.scrollSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ─── NOTES SECTION ───────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Year paper</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TopicsYearLevel")}>
            <Text style={[styles.viewAll, { color: "#fff" }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {NOTES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.scrollCard, { borderColor: "#3b82f6" }]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("TopicsYearLevel")}
            >
              <Icon name="book-outline" size={24} color="#3b82f6" style={{ marginBottom: 10 }} />
              <Text style={styles.scrollTitle}>{item.title}</Text>
              <Text style={styles.scrollSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ─── QUANTUM SECTION ───────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Quantum</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Quantum")}>
            <Text style={[styles.viewAll, { color: "#fff" }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {QUANTUM.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.scrollCard, { borderColor: "#10b981" }]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("QuantumYearLevel")}
            >
              <Icon name="bulb-outline" size={24} color="#10b981" style={{ marginBottom: 10 }} />
              <Text style={styles.scrollTitle}>{item.title}</Text>
              <Text style={styles.scrollSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <BottomNav
        activeIndex={0}
        items={[
          {
            label: "Home",
            icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
            onPress: () => navigation.navigate("Home"),
          },
          {
            label: "Notes",
            icon: "https://cdn-icons-png.flaticon.com/512/768/768818.png",
            onPress: () => navigation.navigate("Notes"),
          },
          {
            label: "Quantum",
            icon: "https://cdn-icons-png.flaticon.com/512/865/865169.png",
            onPress: () => navigation.navigate("QuantumYearLevel"),
          },
          {
            label: "Imp Topics",
            icon: "https://cdn-icons-png.flaticon.com/512/16598/16598001.png",
            onPress: () => navigation.navigate("TopicsYearLevel"),
          },
          {
            label: "PYQ",
            icon: "https://cdn-icons-png.flaticon.com/512/9479/9479324.png",
            onPress: () => navigation.navigate("PyqSemester"),
          },
        ]}
      />

    </View>
  );
}

//
// ─── STYLES ─────────────────────────────
//
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#07070a" },

  container: {
    paddingBottom: 150,
    paddingHorizontal: 0,
    flexGrow: 1, // allows ScrollView to expand naturally
  },

  bannerImage: {
    width: width - 32,
    height: SLIDER_HEIGHT,
    borderRadius: 18,
    marginHorizontal: 16,
  },
  dots: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff", marginHorizontal: 4 },

  heading: { color: "#fff", fontSize: 26, fontWeight: "800", marginHorizontal: 20, marginTop: 24, marginBottom: 8 },
  subHeading: { color: "#9ca3af", fontSize: 14, marginHorizontal: 20, marginBottom: 28 },

  // ─── FEATURE CARDS ─────────────────────────
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  featureCard: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: "center",
    width: CARD_WIDTH,
    borderWidth: 1.5,
    borderColor: "rgb(255, 255, 255)",
    ...Platform.select({
      ios: {
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 5 },
    }),
  },
  featureIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  featureTitle: { color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center", letterSpacing: 0.3 },

  // ─── SECTION HEADERS ─────────────────────────
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 36,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 19, fontWeight: "700", color: "#fff" },
  viewAll: { fontSize: 14, fontWeight: "500" },

  // ─── SCROLL CARDS ─────────────────────────
  scrollCard: {
    backgroundColor: "#141417",
    borderRadius: 22,
    paddingVertical: 5,
    marginTop: 20,
    paddingHorizontal: 8,
    marginRight: 16,
    borderWidth: 1.5,
    width: 140,
    height: 140, // increased card height
    justifyContent: "center",
    alignItems: "center",
  },
  scrollTitle: { color: "#fff", fontSize: 17, fontWeight: "700" },
  scrollSubtitle: { color: "#d1d5db", fontSize: 14, marginTop: 4 },
});