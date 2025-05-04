import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const homescreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Scrollview>
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
            </Scrollview>
        </SafeAreaView>
    )
}


const testResources = [
    {
        id: '1',
        titel: 'Mr Miyagis secret technique',
        type: 'video',
        beschrijving: 'wax on wax off, wax on wax off, the secret to waxing',
        auteur: 'Mr Miyagi',
        rating: '5.0',
        tags: ['Karate', 'Fighting', 'Waxing'],
        thumbnail: 'https:thumbnail',
        duration: '10 hours'

}]

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
        {fontSize: 24, color: '#fff', marginBottom: 20},
    placeholder:
        {fontSize: 16, color: '#fff', padding: 20, textAlign: 'center'},
})

export default homescreen()
