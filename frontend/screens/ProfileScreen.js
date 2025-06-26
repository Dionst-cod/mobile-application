import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiconfig';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDisplayName(res.data.displayName);
    } catch (err) {
      console.error("Kan gebruiker niet ophalen:", err);
    }
  };
  fetchUser();
}, []);

  const handleSave = async () => {
    if (!displayName && !newPassword) {
      Alert.alert('Vul iets in', 'Voer een nieuwe displaynaam of wachtwoord in.');
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const payload = {};
      if (displayName) payload.displayName = displayName;
      if (newPassword) payload.password = newPassword;

      const response = await axios.patch(`${API_BASE_URL}/me`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Profielupdate response:", response.data);
      Alert.alert("Succes!", "Je profiel is succesvol bijgewerkt.");
      navigation.goBack();
      setDisplayName('');
      setNewPassword('');
    } catch (error) {
      console.error('Profiel bijwerken mislukt:', error.response?.data || error.message);
      Alert.alert('Fout', 'Kon profiel niet bijwerken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Profielinstellingen</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Weergavenaam"
        />

        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nieuw wachtwoord"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Opslaan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 44,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f8f9ff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});



