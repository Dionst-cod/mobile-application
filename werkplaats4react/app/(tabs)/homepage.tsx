import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const homescreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>groep5rac</Text>
                    <Text style={styles.subtitle}>wax on wax off test</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>test</Text>
                    {/* test */}
                    <Text style={styles.placeholder}>test2</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>test3</Text>
                    <Text style={styles.placeholder}>rawr..</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:
        { flex: 1, backgroundColor: '#f5f5f5' },
    header:
        { padding: 20 , backgroundColor: '#3498db' , alignItems: 'center' },
    title:
        {fontSize: 28, fontWeight: 'bold' , color: '#fff'},
    subtitle:
        {fontSize: 16, color: '#fff', marginTop: 10},
    section:
        {padding: 15, marginBottom: 20},
    sectionTitle:
        {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
    placeholder:
        {fontSize: 16, color: '#888', padding: 20, textAlign: 'center'},
})

export default homescreen;
