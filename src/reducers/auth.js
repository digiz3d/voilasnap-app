import { AsyncStorage } from 'react-native'
import { createAction, createReducer } from '@reduxjs/toolkit'
import apiRequest from '../utils/api-request'
import { getMe } from './users'

const initialState = {
  error: null,
  isError: false,
  isLoading: false,
  isReady: false,
  jwt: null,
}

export const loginRequest = createAction('LOGIN_REQUEST')
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFailed = createAction('LOGIN_FAIL')
export const loginReady = createAction('LOGIN_READY')
export const logout = createAction('LOGOUT')

export const loginUsingLocalstorage = () => async (dispatch, getState) => {
  const localJwt = await AsyncStorage.getItem('jwt')
  if (localJwt) {
    dispatch(loginSuccess({ token: localJwt }))
    dispatch(getMe({}))
  }
  dispatch(loginReady())
}

export const login = (login, password) => async (dispatch, getState) => {
  dispatch(loginRequest())
  try {
    const { token } = await apiRequest(getState, {
      url: '/auth/signin',
      method: 'POST',
      data: { username: login, password },
    })
    await AsyncStorage.setItem('jwt', token)
    dispatch(loginSuccess({ token }))
    dispatch(getMe({}))
  } catch (error) {
    dispatch(loginFailed(error))
  }
}

const authReducer = createReducer(initialState, {
  [loginRequest](state) {
    return { ...state, isLoading: true, isError: false, error: null }
  },
  [loginSuccess](state, { payload }) {
    return { ...state, isLoading: false, isError: false, jwt: payload.token, error: null }
  },
  [loginFailed](state, { payload }) {
    return { ...state, isLoading: false, isError: true, jwt: null, error: payload }
  },
  [loginReady](state) {
    return { ...state, isReady: true }
  },
  [logout](state) {
    return { ...state, jwt: null }
  },
})

export default authReducer
