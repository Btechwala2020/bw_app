import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';
import NoteCard from '../components/cards/NoteCard';
import NavItem from '../components/navigation/NavItem';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    let navigation;
    try {
        navigation = useNavigation();
    } catch (e) {
        navigation = { navigate: () => {}, goBack: () => {} };
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HERO */}
                <View style={styles.hero}>
                    <Text style={styles.hello}>Hello, Anubhav 👋</Text>
                    <Text style={styles.heroTitle}>
                        1st Year B-Tech – Build{'\n'}Your Strong Foundation
                    </Text>
                </View>

                {/* RECENT NOTES */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Notes</Text>
                    <Text style={styles.viewAll}>View All</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <NoteCard title="Women & Gender Studies" price="₹20" />
                    <NoteCard title="Unit-5 Introduction" price="₹20" />
                </ScrollView>

            </ScrollView>

            {/* BOTTOM NAV */}
            <View style={styles.bottomNav}>
                <NavItem
                    label="Home"
                    icon={require('../assets/icons/home.png')}
                    active
                />
                <NavItem
                    label="Notes"
                    icon={require('../assets/icons/notes.png')}
                />
                <NavItem
                    label="Quantum"
                    icon={require('../assets/icons/pyq.png')}
                    onPress={() => {
                        console.log('QUANTUM CLICKED');
                        navigation.navigate('QuantumYearLevel');
                    }}
                />
                <NavItem
                    label="PYQ"
                    icon={require('../assets/icons/pyq.png')}
                    onPress={() => {
                        console.log('PYQ CLICKED');
                        navigation.navigate('PyqSemester');
                    }}
                />

            </View>
        </View>
    );
};

export default HomeScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#0B0B0F",
    },

    hero: {
        backgroundColor: COLORS.glass,
        margin: 16,
        borderRadius: 22,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    hello: {
        color: COLORS.subText,
        fontSize: 14,
    },

    heroTitle: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
    },

    sectionTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
    },

    viewAll: {
        color: COLORS.accent,
    },

    card: {
        width: 180,
        backgroundColor: COLORS.glass,
        borderRadius: 18,
        marginLeft: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    cardImg: {
        width: '100%',
        height: 100,
        borderRadius: 14,
        marginBottom: 10,
    },

    cardTitle: {
        color: COLORS.text,
        fontSize: 14,
    },

    price: {
        color: '#00ff99',
        marginTop: 6,
        fontWeight: '600',
    },

    bottomNav: {
        flexDirection: 'row',
        backgroundColor: COLORS.glass,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: COLORS.border,
    },


    navItem: {
        alignItems: 'center',
    },

    navText: {
        color: COLORS.subText,
        fontSize: 12,
    },
});
