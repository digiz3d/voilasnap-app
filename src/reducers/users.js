import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'
import apiRequest from '../utils/api-request'

const initialState = {
  byId: {},
  error: null,
  isError: false,
  isLoading: false,
  me: null,
  meIsError: null,
  meIsLoading: true,
}

export const getMe = createAsyncThunk('users/get-me', async (_, { getState }) =>
  apiRequest(getState, { url: '/auth/me' }),
)

const usersReducer = createReducer(initialState, {
  [getMe.pending](state) {
    return { ...state, me: null, meIsError: false, meIsLoading: true }
  },
  [getMe.fulfilled](state, { payload }) {
    return {
      ...state,
      byId: { ...state.byId, [payload._id]: payload },
      me: payload._id,
      meIsError: false,
      meIsLoading: false,
    }
  },
  [getMe.rejected](state, { payload }) {
    return { ...state, me: null, meIsError: true, meIsLoading: false, error: payload }
  },
})

export const selectMe = createSelector(
  [(state) => state.users.me, (state) => state.users.byId],
  (myId, usersById) => {
    if (myId && usersById[myId]) return usersById[myId]
    else return null
  },
)

export default usersReducer
