import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import TopNavbar from '../components/TopNavbar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopNavbar title="Home" showBack={false} />
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header / Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.hello}>Hello, Anubhav 👋</Text>
          <Text style={styles.heroTitle}>
            1st Year B-Tech{'\n'}Build Your Strong{'\n'}Foundation
          </Text>
        </View>

        {/* Section: Recent Notes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Notes</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <NoteCard title="Women & Gender Studies" price="₹20" />
          <NoteCard title="Unit-5 Introduction" price="₹20" />
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navContent}>
          <NavItem
            label="Home"
            icon={require('../assets/icons/home.png')}
            active
            onPress={() => navigation.navigate('Home')}
          />
          <NavItem
            label="Notes"
            icon={require('../assets/icons/notes.png')}
            onPress={() => navigation.navigate('TopicsYearLevel')}
          />
          <NavItem
            label="Syllabus"
            icon={require('../assets/icons/syllabus.png')}
            onPress={() => navigation.navigate('Home')}
          />
          
          <NavItem
            label="Syllabus"
            icon={require('../assets/icons/syllabus.png')}
            onPress={() => navigation.navigate('Home')}
          />
          <NavItem
            label="PYQ"
            icon={require('../assets/icons/pyq.png')}
            onPress={() => navigation.navigate('PyqSemester')}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

//
// ─── COMPONENTS ──────────────────────────────────────────────────────────────
//

const NoteCard = ({ title, price }) => (
  <View style={styles.noteCard}>
    <Text style={styles.noteTitle}>{title}</Text>
    <Text style={styles.notePrice}>{price}</Text>
  </View>
);

const NavItem = ({ label, icon, active, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{ alignItems: 'center' }}
  >
    <Image
      source={icon}
      style={{
        width: 26,
        height: 26,
        tintColor: active ? '#60A5FA' : '#9CA3AF',
      }}
    />
    {label ? (
      <Text
        style={{
          color: active ? '#fff' : '#9CA3AF',
          fontSize: 11,
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    ) : null}
  </TouchableOpacity>
);

//
// ─── STYLES ───────────────────────────────────────────────────────────────────
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // dark navy blue
  },
  hero: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 16,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  hello: {
    color: '#9ca3af',
    fontSize: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    lineHeight: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    color: '#60a5fa',
  },
  noteCard: {
    width: 160,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 12,
    borderRadius: 14,
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  noteTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  notePrice: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
  // Modern bottom nav bar
  bottomNav: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(15,15,20,0.9)',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centerButton: {
    position: 'relative',
    top: -25,
    backgroundColor: '#2563EB',
    borderRadius: 40,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
});

