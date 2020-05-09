import React from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthLoading from '../screens/AuthLoading'
import AuthStackNavigator from './AuthStackNavigator'
import ConnectedStackNavigator from './ConnectedStackNavigator'

const Stack = createStackNavigator()

const MainStackNavigator = ({ jwt }) => {
  const isConnected = jwt !== null
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isConnected && (
          <>
            <Stack.Screen name="AuthLoading" component={AuthLoading} />
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          </>
        )}
        {isConnected && <Stack.Screen name="ConnectedStack" component={ConnectedStackNavigator} />}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const mapStateToProps = (state) => ({ jwt: state.auth.jwt })
export default connect(mapStateToProps)(MainStackNavigator)
