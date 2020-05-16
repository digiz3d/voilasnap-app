import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'

import { login } from '../reducers/auth'
import { TouchableHighlight } from 'react-native-gesture-handler'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { login: '', password: '' }
    this.passwordRef = React.createRef()
  }

  onChangeLogin = (login) => this.setState({ login })

  onChangePassword = (password) => this.setState({ password })

  onSubmit = () => this.props.login({ login: this.state.login, password: this.state.password })

  render() {
    const { isError } = this.props
    return (
      <KeyboardAvoidingView style={style.backgroundView} behavior="height" enabled>
        <View style={style.appTitle}>
          <Image source={require('../../assets/icon.png')} style={style.logo} />
          <Text style={style.appTitleText}>VoilaSnap</Text>
        </View>
        <View style={style.loginForm}>
          <TextInput
            autoCapitalize="none"
            autoCompleteType="email"
            blurOnSubmit={false}
            keyboardType="email-address"
            onChangeText={this.onChangeLogin}
            onSubmitEditing={() => this.passwordRef.current.focus()}
            placeholder="login"
            returnKeyType="next"
            style={style.input}
            textContentType="emailAddress"
          />
          <TextInput
            autoCompleteType="password"
            onChangeText={this.onChangePassword}
            onSubmitEditing={this.onSubmit}
            placeholder="password"
            ref={this.passwordRef}
            returnKeyType="done"
            secureTextEntry={true}
            style={style.input}
            textContentType="password"
          />
          {isError && <Text style={style.errorMessage}>Wrong password</Text>}
          <TouchableHighlight
            onPress={this.onSubmit}
            style={style.submitButton}
            underlayColor="firebrick">
            <Text style={style.submitButtonText}>Sign in</Text>
          </TouchableHighlight>
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
    fontSize: 40,
    color: 'white',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  backgroundView: {
    backgroundColor: '#293542',
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
    backgroundColor: 'rgb(245,245,245)',
    borderColor: 'rgb(230,230,230)',
    borderRadius: 100,
    borderWidth: 1,
    fontSize: 20,
    height: 60,
    marginVertical: 10,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: 'red',
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    marginTop: 50,
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
})
