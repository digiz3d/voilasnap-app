import { createAction, handleActions } from 'redux-actions'
import apiRequest from '../utils/api-request'

const initialState = {
  isLoading: false,
  isError: false,
  jwt: null,
  error: null,
}

export const loginRequest = createAction('LOGIN_REQUEST')
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFailed = createAction('LOGIN_FAIL')

export const login = (login, password) => async (dispatch, getState) => {
  dispatch(loginRequest())

  apiRequest(getState, { url: '/auth/signin', method: 'POST', data: { username: login, password } })
    .then((response) => dispatch(loginSuccess(response)))
    .catch((error) => dispatch(loginFailed(error)))

  /*
  fetch('http://192.168.0.1:3000/auth/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  })
    .then(async response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw await response.json()
    })
    .then(response => response.json())
    .then(data => dispatch(loginSuccess(data)))
    .catch(e => dispatch(loginFailed(e)))
    */
}

export default handleActions(
  {
    [loginRequest](state) {
      return { ...state, isLoading: true, isError: false, error: null }
    },
    [loginSuccess](state, { payload }) {
      return { ...state, isLoading: false, isError: false, jwt: payload.token, error: null }
    },
    [loginFailed](state, { payload }) {
      return { ...state, isLoading: false, isError: true, jwt: null, error: payload }
    },
  },
  initialState,
)
