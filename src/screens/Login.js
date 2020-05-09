import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button } from 'react-native'
import PropTypes from 'prop-types'

import { login } from '../reducers/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { login: '', password: '' }
    this.passwordRef = React.createRef()
  }

  onChangeLogin = (login) => this.setState({ login })

  onChangePassword = (password) => this.setState({ password })

  onSubmit = () => this.props.login(this.state.login, this.state.password)

  render() {
    const { isError } = this.props
    return (
      <KeyboardAvoidingView style={style.backgroundView} behavior="height" enabled>
        <View style={style.appTitle}>
          <Text style={style.appTitleText}>VoilaSnap</Text>
        </View>
        <View style={style.description}>
          <Text>Sign in please</Text>
        </View>
        <View style={style.loginForm}>
          <TextInput
            style={style.input}
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={this.onChangeLogin}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={style.input}
            textContentType="password"
            autoCompleteType="password"
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={this.onChangePassword}
            onSubmitEditing={this.onSubmit}
            ref={this.passwordRef}
          />
          {isError && <Text>Oulala ça va pas du tout</Text>}
          <View style={style.submitButton}>
            <Button title="Sign in" onPress={this.onSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, props) => ({
  isError: state.auth.isError,
  error: state.auth.error,
})

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const style = StyleSheet.create({
  appTitle: {
    alignItems: 'center',
    padding: 10,
  },
  appTitleText: {
    fontSize: 20,
  },
  description: {},
  backgroundView: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
  },
  loginForm: {
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    borderColor: 'rgb(230,230,230)',
    borderWidth: 1,
    backgroundColor: 'rgb(245,245,245)',
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
  },
  submitButton: {
    marginVertical: 5,
  },
})