import { AsyncStorage } from 'react-native'
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import apiRequest from '../utils/api-request'

const initialState = {
  error: null,
  isError: false,
  isLoading: false,
  isReady: false,
  jwt: null,
}

export const loginReady = createAction('auth/ready')
export const logout = createAsyncThunk('auth/logout', async () => AsyncStorage.removeItem('jwt'))
export const login = createAsyncThunk('auth/login', async ({ login, password }, { getState }) => {
  const { token } = await apiRequest(getState, {
    url: '/auth/signin',
    method: 'POST',
    data: { username: login, password },
  })
  await AsyncStorage.setItem('jwt', token)
  return token
})

export const loginUsingLocalstorage = () => async (dispatch, getState) => {
  const localJwt = await AsyncStorage.getItem('jwt')
  if (localJwt) {
    dispatch(login.fulfilled(localJwt))
  }
  dispatch(loginReady())
}

const authReducer = createReducer(initialState, {
  [login.pending](state) {
    return { ...state, isLoading: true, isError: false, error: null }
  },
  [login.fulfilled](state, { payload }) {
    return { ...state, isLoading: false, isError: false, jwt: payload, error: null }
  },
  [login.rejected](state, { payload }) {
    return { ...state, isLoading: false, isError: true, jwt: null, error: payload }
  },
  [loginReady](state) {
    return { ...state, isReady: true }
  },
  [logout.fulfilled](state) {
    return { ...state, jwt: null }
  },
})

export default authReducer
