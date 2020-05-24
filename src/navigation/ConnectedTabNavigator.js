import { connect } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useEffect } from 'react'

import { fetchFriends, fetchMe } from '../reducers/users'
import Camera from '../screens/Camera'
import Chat from '../screens/Chat'
import Friends from '../screens/Friends'

const Tab = createMaterialTopTabNavigator()

const ConnectedTabNavigator = ({ fetchFriends, fetchMe }) => {
  useEffect(() => {
    fetchMe()
    fetchFriends()
  }, [])

  return (
    <Tab.Navigator keyboardDismissMode="on-drag" initialRouteName="Chat" tabBar={() => null}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Friends" component={Friends} />
    </Tab.Navigator>
  )
}
const mapDispatchToProps = { fetchMe, fetchFriends }

export default connect(null, mapDispatchToProps)(ConnectedTabNavigator)
