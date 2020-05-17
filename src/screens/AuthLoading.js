import { connect } from 'react-redux'
import { useEffect } from 'react'

import { loginUsingLocalstorage } from '../reducers/auth'

const AuthLoading = ({ isLoginReady, loginUsingLocalstorage, setIsReady }) => {
  useEffect(() => {
    loginUsingLocalstorage()
  }, [])

  useEffect(() => {
    if (isLoginReady) setIsReady(true)
  }, [isLoginReady])

  return null
}

export default connect((state) => ({ isLoginReady: state.auth.isReady }), {
  loginUsingLocalstorage,
})(AuthLoading)
