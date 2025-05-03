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
      // Hier kun je navigeren naar een andere pagina of een API-aanroep doen
    }
  };

  const handleRegister = () => {
    console.log('Navigeren naar registratie...');
    // Hier kun je navigeren naar het registratieformulier
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inloggen</Text>

      <TextInput
        placeholder="E-mailadres"
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
        secureTextEntry // password-protected
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inloggen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Geen account? Registreren</Text>
      </TouchableOpacity>
    </View>
  );
}

