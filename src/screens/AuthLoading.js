import { connect } from 'react-redux'
import { useEffect } from 'react'

import { loginUsingLocalstorage } from '../reducers/auth'

const AuthLoading = ({ login, setIsReady, isLoginReady }) => {
  useEffect(() => {
    login()
  }, [])

  useEffect(() => {
    if (isLoginReady) setIsReady(true)
  }, [isLoginReady])

  return null
}

export default connect((state) => ({ isLoginReady: state.auth.isReady }), {
  login: loginUsingLocalstorage,
})(AuthLoading)
