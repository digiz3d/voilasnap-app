import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthStackNavigator from './AuthStackNavigator'
import ConnectedTabNavigator from './ConnectedTabNavigator'

const Stack = createStackNavigator()

const MainStackNavigator = ({ jwt }) => {
  const isConnected = jwt !== null
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isConnected && <Stack.Screen name="AuthStack" component={AuthStackNavigator} />}
        {isConnected && <Stack.Screen name="ConnectedTab" component={ConnectedTabNavigator} />}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const mapStateToProps = (state) => ({ jwt: state.auth.jwt })
export default connect(mapStateToProps)(MainStackNavigator)
