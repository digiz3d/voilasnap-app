import React, { Component } from 'react'
import { View, Text } from 'react-native'

class AuthLoading extends Component {
  componentDidMount() {
    const { navigation } = this.props
    setTimeout(() => navigation.navigate('AuthStack'), 2000)
  }

  render() {
    return (
      <View>
        <Text>Chargement</Text>
      </View>
    )
  }
}

export default AuthLoading
