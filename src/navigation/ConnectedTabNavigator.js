import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect } from 'react'

import { fetchMe, fetchFriends } from '../reducers/users'
import Camera from '../screens/Camera'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'

const Tab = createMaterialTopTabNavigator()

const ChatIcon = ({ color }) => <MaterialCommunityIcons name="chat" color={color} size={20} />

const CameraIcon = ({ color }) => <MaterialCommunityIcons name="camera" color={color} size={20} />

const AccountIcon = ({ color }) => <MaterialCommunityIcons name="account" color={color} size={20} />

const SafeAreaMaterialTopTabBar = (props) => (
  <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
    <MaterialTopTabBar {...props} style={{ shadowOpacity: 0 }} />
  </SafeAreaView>
)

const ConnectedTabNavigator = ({ fetchMe, fetchFriends }) => {
  useEffect(() => {
    fetchMe()
    fetchFriends()
  }, [])

  return (
    <Tab.Navigator
      keyboardDismissMode="on-drag"
      initialRouteName="Chat"
      tabBar={SafeAreaMaterialTopTabBar}
      tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showIcon: true,
        showLabel: false,
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
}
const mapDispatchToProps = { fetchMe, fetchFriends }

export default connect(null, mapDispatchToProps)(ConnectedTabNavigator)
