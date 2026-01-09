import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const YEARS = ['2020-21', '2021-22', '2022-23',"2023-24","2024-25","2025-26"];

const PyqYearScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { semesterKey, semesterName } = route.params;

    return (
        <View style={styles.root}>
            {/* 🔙 HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Select Year</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{semesterName}</Text>
                <Text style={styles.subTitle}>Choose Academic Year</Text>

                {YEARS.map((year) => (
                    <TouchableOpacity
                        key={year}
                        activeOpacity={0.85}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('PyqSubjects', {
                                semesterKey,
                                semesterName,
                                year,
                            })
                        }
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.year}>{year}</Text>
                            <Text style={styles.hint}>Tap to view subjects</Text>
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

export default PyqYearScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // backgroundColor: '#020617', // 🔥 SOLID DARK
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
        // borderWidth: 1,
        // borderColor: '#24cfa6',
    },

    year: {
        fontSize: 18,
        fontWeight: '700',
        color: '#e5e7eb',
    },

    hint: {
        marginTop: 6,
        fontSize: 12,
        color: '#9ca3af',
    },
    card: {
        backgroundColor: '#171717',
        borderRadius: 16,
        padding: 20,
        marginBottom: 14,
        // borderWidth: 1,
        // borderColor: '#24cfa6',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardContent: {
        flex: 1,
    },

    arrowWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        // backgroundColor: 'rgba(36,207,166,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'rgb(18, 191, 151)',
        borderWidth: 1,
        marginLeft: 12,
    },

    arrow: {
        fontSize: 35,
        color: '#999',
        fontWeight: '700',
        marginTop:"-8"
    },

});
