import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiconfig';

const isHREmail = (email) => /^[^@]+@hr\.nl$/.test(email);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!isHREmail(email)) {
      Alert.alert('Ongeldig e-mailadres', 'Gebruik een @hr.nl e-mailadres.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { token } = response.data;

      if (token) {
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login mislukt', 'Geen token ontvangen.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login mislukt', 'Verkeerde gebruikersnaam of wachtwoord.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Inloggen</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mailadres"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Wachtwoord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f4f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
