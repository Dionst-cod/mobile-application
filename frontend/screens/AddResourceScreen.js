import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiconfig';
import { useNavigation } from '@react-navigation/native';

const AddResourceScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Niet ingelogd', 'Je moet eerst inloggen.');
      return;
    }

    if (!title || !url || !type) {
      Alert.alert('Verplicht veld', 'Titel, URL en Type zijn verplicht.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/resources`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url,
          description,
          type,
        }),
      });

      if (response.ok) {
        Alert.alert('Gelukt!', 'Je resource is gedeeld.');
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        console.error('Fout:', errorData);
        Alert.alert('Fout bij opslaan', errorData.message || 'Er ging iets mis.');
      }
    } catch (error) {
      console.error('Netwerkfout:', error);
      Alert.alert('Netwerkfout', 'Kon geen verbinding maken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Deel een nieuwe resource</Text>

      <TextInput
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Beschrijving (optioneel)"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <TextInput
        placeholder="Type (bijv. artikel, video)"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Versturen...' : 'Verzend resource'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddResourceScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f0f0f0',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
