import React, { Component } from 'react'
import { View, Text } from 'react-native'

import PropTypes from 'prop-types'

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

AuthLoading.propTypes = {
  navigation: PropTypes.object,
}

export default AuthLoading
