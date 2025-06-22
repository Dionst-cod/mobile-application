import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>Login Pagina</Text>
      <Button title="Inloggen" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
