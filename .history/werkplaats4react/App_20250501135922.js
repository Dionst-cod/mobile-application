import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Fout', 'Vul zowel e-mail als wachtwoord in.');
      return;
    }

    if (email === 'test@voorbeeld.com' && password === 'wachtwoord123') {
      setLoggedIn(true);
    } else {
      Alert.alert('Fout', 'Ongeldige inloggegevens.');
    }
  };

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welkom, je bent ingelogd!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inloggen</Text>
      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Wachtwoord"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
  },
});