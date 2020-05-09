import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Messages from '../screens/Messages'

const Stack = createStackNavigator()

const ConnectedStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Messages" component={Messages} />
  </Stack.Navigator>
)

export default ConnectedStackNavigator
