import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

const ProfileScreen = () => {
    const [user, setUser] = useState({
        email: '123456@hr.nl',
        displayName: 'spongebob',
        studentNumber: '123456',
        isAdmin: false,
    })

    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingPass, setIsEditingPass] = useState(false)
    const [editDisplayName, setEditDisplayName] = useState(false)
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleSaveDisplayN = () => {

    }

    const handleSavePass = () => {
        if (!passwordForm.currentPassword) {

        }
        if (passwordForm.newPassword.length < 8) {

        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {

        }

    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.profileAvatar}>
                        <View style={styles.avatarC}></View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{user.displayName}</Text>
                            <Text style={styles.profileEmail}>{user.email}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>Profile Information</Text>

                            <View style={styles.formGroup}>

                            </View>
                        </View>

                    </View>
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
    profileAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default ProfileScreen;