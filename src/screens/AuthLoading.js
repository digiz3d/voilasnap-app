import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Constants from 'expo-constants'

class AuthLoading extends Component {
  componentDidMount() {
    const { navigation } = this.props
    setTimeout(() => navigation.navigate('AuthStack'), 2000)
  }

  render() {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight, flexGrow: 1 }}>
        <Text>Loading</Text>
      </View>
    )
  }
}

export default AuthLoading
