import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const YEAR_LEVELS = [
    { id: '1', level: '1st Year', subtitle: 'Semesters 1 & 2', semCount: 2 },
    { id: '2', level: '2nd Year', subtitle: 'Semesters 3 & 4', semCount: 2 },
    { id: '3', level: '3rd Year', subtitle: 'Semesters 5 & 6', semCount: 2 },
    { id: '4', level: '4th Year', subtitle: 'Semesters 7 & 8', semCount: 2 },
];

const QuantumYearLevelScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            {/* 🔙 HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Select Year Level</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Student Year Level</Text>
                <Text style={styles.subTitle}>Choose your academic year</Text>

                {YEAR_LEVELS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.85}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('QuantumPdfList', {
                                yearLevel: item.level,
                            })
                        }
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.yearText}>{item.level}</Text>
                            <Text style={styles.hint}>{item.subtitle}</Text>
                        </View>

                        <View style={styles.arrowWrap}>
                            <Text style={styles.arrow}>›</Text>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default QuantumYearLevelScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#050508',
    },

    header: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.08)',
    },

    backArrow: {
        fontSize: 26,
        color: '#22c55e',
        fontWeight: '600',
    },

    headerTitle: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
    },

    container: {
        padding: 20,
        paddingTop: 24,
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 6,
    },

    subTitle: {
        color: '#94a3b8',
        fontSize: 14,
        marginBottom: 24,
    },

    card: {
        backgroundColor: '#171717',
        borderRadius: 16,
        padding: 20,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardContent: {
        flex: 1,
    },

    yearText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#e5e7eb',
    },

    hint: {
        marginTop: 6,
        fontSize: 12,
        color: '#9ca3af',
    },

    arrowWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginLeft: 12,
    },

    arrow: {
        fontSize: 35,
        color: '#999',
        fontWeight: '700',
        marginTop: '-8',
    },
});
