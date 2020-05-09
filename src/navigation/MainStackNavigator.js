import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthLoading from '../screens/AuthLoading'
import AuthStackNavigator from './AuthStackNavigator'

const Stack = createStackNavigator()

const MainStackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default MainStackNavigator
