import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,
} from 'react-native';

const dummy_resources = [
    { id: 1, title: 'react native'},
    {id: 2, title: 'intro to programming'},
]

const ResourceScreen = () => {
    return (
       <View style={styles.container}>
           <FlatList
               data={dummy_resources}
               renderItem={({ item }) => (
                   <View style={styles.card}>
                       <Text style={styles.cardTitle}>{item.title}</Text>
                   </View>
               )}
               keyExtractor={(item) => item.id}
           />
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '200',
    }
})

export default ResourceScreen;