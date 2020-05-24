import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'

import { login } from '../../reducers/auth'

const Login = (props) => {
  const passwordRef = useRef(null)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => props.login({ login, password })

  return (
    <KeyboardAvoidingView
      style={style.backgroundView}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <View style={style.appTitle}>
        <Image source={require('../../../assets/icon.png')} style={style.logo} />
        <Text style={style.appTitleText}>VoilaSnap</Text>
      </View>
      <View style={style.loginForm}>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          blurOnSubmit={false}
          keyboardType="email-address"
          onChangeText={setLogin}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="login"
          returnKeyType="next"
          style={style.input}
          textContentType="emailAddress"
        />
        <TextInput
          autoCompleteType="password"
          onChangeText={setPassword}
          onSubmitEditing={onSubmit}
          placeholder="password"
          ref={passwordRef}
          returnKeyType="done"
          secureTextEntry={true}
          style={style.input}
          textContentType="password"
        />
        {props.isError && <Text style={style.errorMessage}>{props.error.message}</Text>}
        <TouchableHighlight onPress={onSubmit} style={style.submitButton} underlayColor="firebrick">
          <Text style={style.submitButtonText}>Sign in</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = (state) => ({
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
