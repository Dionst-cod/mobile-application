import 'react'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Resources from './werkplaats4react/app/(tabs)/resources'
import ResourcesDetails from './werkplaats4react/screens/ResourceDetailScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Resources">
        <Stack.Screen name="resources" component={Resources} />
        <Stack.Screen name="resourceDetails" component={ResourcesDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}