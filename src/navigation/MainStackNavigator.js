import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthLoading from '../screens/AuthLoading'
import AuthStackNavigator from './AuthStackNavigator'
import ConnectedTabNavigator from './ConnectedTabNavigator'

const Stack = createStackNavigator()

const MainStackNavigator = ({ jwt }) => {
  const [isInitialized, setIsInitialized] = useState(false)

  const isConnected = jwt !== null
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isInitialized && (
          <Stack.Screen
            name="AuthLoading"
            component={AuthLoading}
            initialParams={{ setIsInitialized }}
          />
        )}
        {isInitialized && !isConnected && (
          <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
        )}
        {isInitialized && isConnected && (
          <Stack.Screen name="ConnectedStack" component={ConnectedTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const mapStateToProps = (state) => ({ jwt: state.auth.jwt })
export default connect(mapStateToProps)(MainStackNavigator)
