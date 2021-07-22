import AsyncStorage from '@react-native-async-storage/async-storage'

import login from './login'
import loginReady from './loginReady'

const loginUsingLocalstorage = () => async (dispatch) => {
  const localJwt = await AsyncStorage.getItem('jwt')
  if (localJwt) {
    dispatch(login.fulfilled(localJwt))
  }
  dispatch(loginReady())
}

export default loginUsingLocalstorage
