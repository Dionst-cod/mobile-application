import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './werkpalapp/HomePage';  // Update this path to point to your HomePage.js

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerShown: false // Hide the navigation header since we have our own
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}