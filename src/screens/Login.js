import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button } from 'react-native'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { login: '', password: '' }
  }

  onChangeLogin = login => this.setState({ login })

  onChangePassword = password => this.setState({ password })

  onSubmit = () => {
    fetch('http://192.168.0.1:3000/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.login,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <KeyboardAvoidingView style={style.backgroundView} behavior="height" enabled>
        <View style={style.appTitle}>
          <Text style={style.appTitleText}>VoilaSnap</Text>
        </View>
        <View style={style.description}>
          <Text>Sign in because good</Text>
        </View>
        <View style={style.loginForm}>
          <TextInput
            style={style.input}
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={this.onChangeLogin}
          />
          <TextInput
            style={style.input}
            textContentType="password"
            autoCompleteType="password"
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={this.onChangePassword}
          />
          <View style={style.submitButton}>
            <Button title="Sign in" onPress={this.onSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

Login.propTypes = {}

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

export default Login
