import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Messages from '../screens/Messages'
import Pictures from '../screens/Pictures'
import Camera from '../screens/Camera'
const Tab = createBottomTabNavigator()

const ConnectedTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="Chat" component={Messages} />
    <Tab.Screen name="Camera" component={Camera} />
    <Tab.Screen name="Pic" component={Pictures} />
  </Tab.Navigator>
)

export default ConnectedTabNavigator
