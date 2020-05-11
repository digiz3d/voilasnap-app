import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'
import Camera from '../screens/Camera'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const ChatIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="chat" color={color} size={size} />
)

const CameraIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="camera" color={color} size={size} />
)

const AccountIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="account" color={color} size={size} />
)

const ConnectedTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Chat"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}>
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ChatIcon,
      }}
    />
    <Tab.Screen
      name="Camera"
      component={Camera}
      options={{
        tabBarLabel: 'Camera',
        tabBarIcon: CameraIcon,
        unmountOnBlur: true,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: AccountIcon,
      }}
    />
  </Tab.Navigator>
)

export default ConnectedTabNavigator
