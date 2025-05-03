import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Foutmelding', 'Vul zowel je e-mailadres als wachtwoord in.');
    } else {
      console.log('Inloggen met:', email, password);
    }
  };

  const handleRegister = () => {
    console.log('Ga naar registratie...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inloggen</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Wachtwoord"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inloggen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Geen account? Registreren</Text>
      </TouchableOpacity>
    </View>
  );
}