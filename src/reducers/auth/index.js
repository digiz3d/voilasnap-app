import { createReducer } from '@reduxjs/toolkit'

import { fetchMe } from '../users'

import login from './actions/login'
import loginReady from './actions/loginReady'
import logout from './actions/logout'

const initialState = {
  error: null,
  isError: false,
  isLoading: false,
  isReady: false,
  jwt: null,
}

const authReducer = createReducer(initialState, {
  [fetchMe.rejected](state) {
    return { ...state, jwt: null }
  },
  [login.pending](state) {
    return { ...state, isLoading: true, isError: false, error: null }
  },
  [login.fulfilled](state, { payload }) {
    return { ...state, isLoading: false, isError: false, jwt: payload, error: null }
  },
  [login.rejected](state, { error }) {
    return { ...state, isLoading: false, isError: true, jwt: null, error }
  },
  [loginReady](state) {
    return { ...state, isReady: true }
  },
  [logout.fulfilled](state) {
    return { ...state, jwt: null }
  },
})

export default authReducer
