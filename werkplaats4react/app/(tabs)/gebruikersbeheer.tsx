import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

const Gebruikersbeheer = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            email: 'peterdevries@hr.nl',
            displayName: 'Peter de Vries',
            studentNumber: '123456',
            isBlocked: false,
            isAdmin: false,
        }
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [editDisplayName, setEditDisplayName] = useState(false)

    const filteredUsers = users.filter(user => {
        const matchSearch =
            user.email.toLowerCase().includes(searchTerm.toLowerCase) ||
            user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.studentNumber.includes(searchTerm)

        return matchSearch
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Gebruikers beheer</Text>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="zoek op naam, email, studentn"
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            placeholderTextColor="#9CA3FA"
                        />
                    </View>
                </View>

                <View style={styles.usersList}>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollView: {
        flex: 1,
        padding: 20
    },
    header: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
    },
    searchInputContainer: {
      flex: 1,
      alignItems: 'center',
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1f325a'
    },
    usersList: {
        paddingHorizontal: 20,
    },
    profileAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Gebruikersbeheer;