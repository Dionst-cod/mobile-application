import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, RefreshControl} from 'react-native';

const Gebruikersbeheer = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            email: 'peterdevries@hr.nl',
            displayName: 'Peter de Vries',
            studentNumber: '123456',
            isBlocked: false,
            isAdmin: false,
        },
        {
            id: 2,
            email: 'lolaIkKan@hr.nl',
            displayName: 'Lola IkKan',
            studentNumber: '975310',
            isBlocked: false,
            isAdmin: false,
        }
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [editDisplayName, setEditDisplayName] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const filteredUsers = users.filter(user => {
        const matchSearch =
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.studentNumber.includes(searchTerm)

        return matchSearch
    })

    const getStatusText = (user) => {
        if (user.isAdmin) return 'Admin'
        if (user.isBlocked) return 'Blokkeerd'
        return 'Actief'
    }

    const toggleUserBlock = (userId) => {
        const user = users.find(user => user.id === userId)
        return
    }

    const UserCard = ({user}) => (
        <View style={styles.userCard}>
            <View style={styles.userHeader}>
                <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>
                        {user.displayName[0]}
                    </Text>
                </View>

                <View style={styles.userDetails}>
                    <View style={styles.userNameRow}>
                        <Text style={styles.userName}>{user.displayName}</Text>
                    </View>
                    <Text style={styles.userMail}>{user.email}</Text>
                    <Text style={styles.userStudentNr}>{user.studentNumber}</Text>
                </View>
            </View>

            <View style={styles.userInfo}>
                <View style={styles.statusRow}>
                </View>
            </View>

            <View style={styles.userStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Bronnen</Text>
                </View>
            </View>

            <TouchableOpacity style={[styles.editButton,
                {
                    backgroundColor: user.isAdmin
                    ? '#0066CC'
                    : '#ccc'
                }
                ]}
                              onPress={() => toggleUserBlock(user.id)}
                              disabled={user.isAdmin}
            >
                <Text style={styles.actionButtonText}>
                    {user.isAdmin ? 'Admin' : user.isBlocked ? 'Deblokkeren' : 'Blokkeren'}
                </Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor= "#0066CC" />

                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Gebruikers beheer</Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                >

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
                    {filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
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
    userCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
    },
    userAvatarText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 50,
    },
    userDetails: {
        marginLeft: 16,
    },
    userNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userMail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    userStudentNr: {
        fontSize: 14,
        color: '#666',
    },
    userInfo: {
        marginTop: 16,
    },
    statusRow: {
        flexDirection: 'row',
    },
    statusLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    statusText: {
        fontSize: 14,
        color: '#666',
    },
    userStats: {
        marginTop: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    statText: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: 16,
        color: 'white',
    },
    content: {
        flex: 1,
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        flex: 1,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    }

})

export default Gebruikersbeheer;